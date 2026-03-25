import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoleDto) {
    return this.prisma.role.create({ data: dto });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query);
    const [items, total] = await Promise.all([
      this.prisma.role.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.role.count(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò');
    }
    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    await this.findOne(id);
    return this.prisma.role.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.role.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
}
