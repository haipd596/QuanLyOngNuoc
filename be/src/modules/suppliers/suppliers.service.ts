import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: dto });
  }

  async findAll(query: PaginationQueryDto, keyword?: string) {
    const { page, limit, skip } = normalizePagination(query);
    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword } },
            { phone: { contains: keyword } },
            { email: { contains: keyword } },
            { address: { contains: keyword } },
            { taxCode: { contains: keyword } },
          ],
        }
      : undefined;

    const [items, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.supplier.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.prisma.supplier.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }
    return item;
  }

  async update(id: string, dto: UpdateSupplierDto) {
    await this.findOne(id);
    return this.prisma.supplier.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.supplier.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
}
