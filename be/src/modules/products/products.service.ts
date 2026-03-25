import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(search?: string) {
    return this.prisma.product.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { sku: { contains: search } },
              { slug: { contains: search } },
            ],
          }
        : undefined,
      include: {
        category: true,
        supplier: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findLowStock() {
    return this.prisma.$queryRaw`
      SELECT * FROM Product
      WHERE stockQuantity <= minStockLevel
      ORDER BY stockQuantity ASC
    `;
  }

  async findOne(id: string) {
    const item = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, supplier: true },
    });
    if (!item) {
      throw new NotFoundException('Product not found');
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
    return { message: 'Deleted successfully' };
  }
}
