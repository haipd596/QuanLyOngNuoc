import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: dto });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query);
    const [items, total] = await Promise.all([
      this.prisma.customer.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.customer.count(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.prisma.customer.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Không tìm thấy khách hàng');
    }
    return item;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.customer.delete({ where: { id } });
    return { message: 'Xóa thành công' };
  }
}
