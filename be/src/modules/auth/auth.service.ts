import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ROLE_CUSTOMER } from '../../common/constants/roles.constant';
import { PrismaService } from '../../config/prisma.service';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    const existed = await this.usersService.findByEmail(dto.email);
    if (existed) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const defaultRoleId = await this.findRoleIdByName(ROLE_CUSTOMER);
    if (!defaultRoleId) {
      throw new InternalServerErrorException('Chưa cấu hình vai trò mặc định CUSTOMER');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    let user: {
      id: string;
      fullName: string;
      email: string;
      roleId: string | null;
      role: { name: string } | null;
    };
    try {
      user = await this.prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone,
            dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
            passwordHash,
            roleId: defaultRoleId,
          },
          include: {
            role: {
              select: { name: true },
            },
          },
        });

        await tx.customer.upsert({
          where: { email: dto.email },
          update: {
            fullName: dto.fullName,
            phone: dto.phone,
          },
          create: {
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone,
            address: null,
            note: null,
          },
        });

        return createdUser;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Email hoặc số điện thoại đã tồn tại');
      }
      throw error;
    }

    const tokens = await this.issueTokens({
      sub: user.id,
      email: user.email,
      role: user.role?.name ?? ROLE_CUSTOMER,
    });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        role: user.role?.name ?? ROLE_CUSTOMER,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Tài khoản đang bị khóa hoặc chưa kích hoạt');
    }

    const tokens = await this.issueTokens({
      sub: user.id,
      email: user.email,
      role: user.role?.name ?? ROLE_CUSTOMER,
    });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        role: user.role?.name ?? ROLE_CUSTOMER,
      },
      ...tokens,
    };
  }

  async changePassword(dto: ChangePasswordDto) {
    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new BadRequestException('Email hoặc mật khẩu cũ không đúng');
    }

    const oldPasswordValid = await bcrypt.compare(dto.oldPassword, user.passwordHash);
    if (!oldPasswordValid) {
      throw new BadRequestException('Email hoặc mật khẩu cũ không đúng');
    }

    const isSamePassword = await bcrypt.compare(dto.newPassword, user.passwordHash);
    if (isSamePassword) {
      throw new BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return null;
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.usersService.findOne(payload.sub);
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException();
      }
      return this.issueTokens({
        sub: user.id,
        email: user.email,
        role: user.role?.name ?? ROLE_CUSTOMER,
      });
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }
  }

  async me(userId: string) {
    return this.usersService.findOne(userId);
  }

  async updateMe(userId: string, dto: UpdateMyProfileDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!currentUser) {
      throw new UnauthorizedException('Khong tim thay tai khoan');
    }

    if (dto.email && dto.email !== currentUser.email) {
      const existedEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
        select: { id: true },
      });
      if (existedEmail) {
        throw new BadRequestException('Email da ton tai');
      }
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        roleId: true,
        role: { select: { name: true } },
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const customerByOldEmail = await this.prisma.customer.findFirst({
      where: { email: currentUser.email },
      select: { id: true },
    });

    if (customerByOldEmail) {
      await this.prisma.customer.update({
        where: { id: customerByOldEmail.id },
        data: {
          fullName: updated.fullName,
          email: updated.email,
          phone: updated.phone ?? null,
        },
      });
    } else {
      await this.prisma.customer.create({
        data: {
          fullName: updated.fullName,
          email: updated.email,
          phone: updated.phone ?? null,
        },
      });
    }

    return updated;
  }

  private async issueTokens(payload: JwtPayload) {
    const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET') ?? '';
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') ?? '';
    if (!accessSecret || !refreshSecret) {
      throw new InternalServerErrorException('Thiếu cấu hình JWT secret');
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async findRoleIdByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: { name },
      select: { id: true },
    });

    return role?.id;
  }
}
