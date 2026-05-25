import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
import { ROLE_SELLER } from '../../common/constants/roles.constant';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateUserDto) {
    const existed = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existed) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const generatedPassword = this.generateTempPassword();
    const passwordHash = await bcrypt.hash(generatedPassword, 10);
    const defaultRoleId = dto.roleId ?? (await this.findRoleIdByName(ROLE_SELLER));

    const created = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        passwordHash,
        phone: dto.phone,
        roleId: defaultRoleId,
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
      },
    });

    await this.mailService.sendBusinessMailSafe({
      to: dto.email,
      subject: 'Tai khoan nhan vien moi',
      content: `Xin chao ${dto.fullName},\nTai khoan nhan vien da duoc tao.\nEmail dang nhap: ${dto.email}\nMat khau tam thoi: ${generatedPassword}\nVui long doi mat khau sau khi dang nhap.`,
    });

    return created;
  }

  async findAll(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { fullName: { contains: keyword } },
          { email: { contains: keyword } },
          { phone: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.FullName)
      andConditions.push({ fullName: { contains: filters.FullName } });
    if (filters?.Email) andConditions.push({ email: { contains: filters.Email } });
    if (filters?.Phone) andConditions.push({ phone: { contains: filters.Phone } });
    if (filters?.Status) andConditions.push({ status: { equals: filters.Status } });
    if (filters?.RoleId) andConditions.push({ roleId: { equals: filters.RoleId } });

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
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
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
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
      },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        role: { select: { name: true } },
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const data: {
      fullName?: string;
      phone?: string;
      roleId?: string;
      passwordHash?: string;
      status?: UserStatus;
    } = {};

    if (dto.fullName) data.fullName = dto.fullName;
    if (dto.phone) data.phone = dto.phone;
    if (dto.roleId) data.roleId = dto.roleId;
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
    if (dto.status) data.status = dto.status;

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        roleId: true,
        role: { select: { name: true } },
        status: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
  private async findRoleIdByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: { name },
      select: { id: true },
    });

    return role?.id;
  }

  private generateTempPassword(length = 12) {
    const chars =
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
    const bytes = randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  }
}
