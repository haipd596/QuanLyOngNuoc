import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query);
    const [items, total] = await Promise.all([
      this.prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.category.count(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.prisma.category.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return item;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
}
