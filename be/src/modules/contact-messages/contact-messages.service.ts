import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { buildPaginatedResult, normalizePagination } from '../../common/utils/pagination.util';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';

@Injectable()
export class ContactMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        status: (dto.status as any) ?? 'NEW',
        note: dto.note,
      },
    });
  }

  async findAll(query: PaginationQueryDto, keyword?: string, filters?: Record<string, string>) {
    const { page, limit, skip } = normalizePagination(query);
    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { fullName: { contains: keyword } },
          { email: { contains: keyword } },
          { phone: { contains: keyword } },
          { message: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.FullName) andConditions.push({ fullName: { contains: filters.FullName } });
    if (filters?.Email) andConditions.push({ email: { contains: filters.Email } });
    if (filters?.Phone) andConditions.push({ phone: { contains: filters.Phone } });
    if (filters?.Status) andConditions.push({ status: { equals: filters.Status as any } });

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contactMessage.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const item = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Khong tim thay lien he');
    return item;
  }

  async update(id: string, dto: UpdateContactMessageDto) {
    await this.findOne(id);
    return this.prisma.contactMessage.update({
      where: { id },
      data: {
        ...dto,
        status: dto.status as any,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.contactMessage.delete({ where: { id } });
    return { message: 'Xoa thanh cong' };
  }
}
