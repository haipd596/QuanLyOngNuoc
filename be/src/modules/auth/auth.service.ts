import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ROLE_CUSTOMER } from '../../common/constants/roles.constant';
import { PrismaService } from '../../config/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const defaultRoleId = dto.roleId ?? (await this.findRoleIdByName(ROLE_CUSTOMER));
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        passwordHash,
        roleId: defaultRoleId,
      },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

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

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return this.issueTokens(payload);
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }
  }

  async me(userId: string) {
    return this.usersService.findOne(userId);
  }

  private async issueTokens(payload: JwtPayload) {
    const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET') ?? '';
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') ?? '';

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
