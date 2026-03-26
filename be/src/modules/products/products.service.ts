import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        stockQuantity: dto.stockQuantity ?? 0,
        minStockLevel: dto.minStockLevel ?? 5,
      },
    });
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
          { sku: { contains: keyword } },
          { slug: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.Sku) andConditions.push({ sku: { contains: filters.Sku } });
    if (filters?.Name) andConditions.push({ name: { contains: filters.Name } });
    if (filters?.Slug) andConditions.push({ slug: { contains: filters.Slug } });
    if (filters?.Unit) andConditions.push({ unit: { contains: filters.Unit } });
    if (filters?.Status)
      andConditions.push({ status: { equals: filters.Status } });
    if (filters?.CategoryId)
      andConditions.push({ categoryId: { equals: filters.CategoryId } });
    if (filters?.SupplierId)
      andConditions.push({ supplierId: { equals: filters.SupplierId } });

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: true,
          supplier: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findLowStock(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const sqlKeyword = keyword ? `%${keyword}%` : null;
    const queryId = filters?.Id ?? null;
    const querySku = filters?.Sku ? `%${filters.Sku}%` : null;
    const queryName = filters?.Name ? `%${filters.Name}%` : null;
    const querySlug = filters?.Slug ? `%${filters.Slug}%` : null;
    const queryStatus = filters?.Status ?? null;
    const [items, total] = await Promise.all([
      this.prisma.$queryRaw<
        Array<{
          id: string;
          sku: string;
          name: string;
          slug: string;
          categoryId: string | null;
          supplierId: string | null;
          unit: string;
          importPrice: number;
          salePrice: number;
          stockQuantity: number;
          minStockLevel: number;
          description: string | null;
          status: string;
          createdAt: Date;
          updatedAt: Date;
        }>
      >`
        SELECT *
        FROM Product
        WHERE stockQuantity <= minStockLevel
          AND (
            ${sqlKeyword} IS NULL
            OR name LIKE ${sqlKeyword}
            OR sku LIKE ${sqlKeyword}
            OR slug LIKE ${sqlKeyword}
          )
          AND (${queryId} IS NULL OR id = ${queryId})
          AND (${querySku} IS NULL OR sku LIKE ${querySku})
          AND (${queryName} IS NULL OR name LIKE ${queryName})
          AND (${querySlug} IS NULL OR slug LIKE ${querySlug})
          AND (${queryStatus} IS NULL OR status = ${queryStatus})
        ORDER BY stockQuantity ASC
        LIMIT ${limit} OFFSET ${skip}
      `,
      this.prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM Product
        WHERE stockQuantity <= minStockLevel
          AND (
            ${sqlKeyword} IS NULL
            OR name LIKE ${sqlKeyword}
            OR sku LIKE ${sqlKeyword}
            OR slug LIKE ${sqlKeyword}
          )
          AND (${queryId} IS NULL OR id = ${queryId})
          AND (${querySku} IS NULL OR sku LIKE ${querySku})
          AND (${queryName} IS NULL OR name LIKE ${queryName})
          AND (${querySlug} IS NULL OR slug LIKE ${querySlug})
          AND (${queryStatus} IS NULL OR status = ${queryStatus})
      `,
    ]);

    return buildPaginatedResult(items, Number(total[0]?.count ?? 0), page, limit);
  }

  async findOne(id: string) {
    const item = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, supplier: true },
    });
    if (!item) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }
    return item;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
}
