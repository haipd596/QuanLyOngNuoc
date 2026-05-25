import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getProductCounts() {
    const items = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      productCount: item._count.products,
    }));
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
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
          { name: { contains: keyword } },
          { slug: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.Name) andConditions.push({ name: { contains: filters.Name } });
    if (filters?.Slug) andConditions.push({ slug: { contains: filters.Slug } });
    if (filters?.Description)
      andConditions.push({ description: { contains: filters.Description } });

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.category.count({ where }),
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

  async remove(id: string, force = false) {
    await this.findOne(id);

    const usedByProducts = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (usedByProducts > 0 && !force) {
      throw new BadRequestException(
        `Danh mục đang được dùng bởi ${usedByProducts} sản phẩm`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      if (usedByProducts > 0 && force) {
        await tx.product.deleteMany({
          where: { categoryId: id },
        });
      }

      await tx.category.delete({ where: { id } });
    });

    return {
      message:
        usedByProducts > 0 && force
          ? `Đã xóa danh mục và ${usedByProducts} sản phẩm liên quan`
          : 'Xóa thành công',
    };
  }
}
