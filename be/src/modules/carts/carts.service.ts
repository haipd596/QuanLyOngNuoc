import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCart(sessionId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { orderBy: { isMain: 'desc' } }
              }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { sessionId },
        include: { items: { include: { product: { include: { images: true } } } } }
      });
    }
    return cart;
  }

  async addToCart(dto: AddToCartDto) {
    let cart = await this.prisma.cart.findUnique({ where: { sessionId: dto.sessionId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { sessionId: dto.sessionId } });
    }

    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    
    const existingItem = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId: dto.productId } }
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + dto.quantity;
      if (newQuantity > product.stockQuantity) throw new BadRequestException('Vượt quá số lượng tồn kho');
      
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      if (dto.quantity > product.stockQuantity) throw new BadRequestException('Vượt quá số lượng tồn kho');
      
      await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId: dto.productId, quantity: dto.quantity }
      });
    }

    return this.getCart(dto.sessionId);
  }

  async updateQuantity(sessionId: string, productId: string, quantity: number) {
    if (quantity <= 0) return this.removeItem(sessionId, productId);
    
    const cart = await this.prisma.cart.findUnique({ where: { sessionId } });
    if (!cart) throw new NotFoundException('Giỏ hàng không tồn tại');

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || quantity > product.stockQuantity) {
      throw new BadRequestException('Tồn kho không đủ');
    }

    try {
      await this.prisma.cartItem.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity }
      });
    } catch (error) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong giỏ');
    }
    
    return this.getCart(sessionId);
  }

  async removeItem(sessionId: string, productId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { sessionId } });
    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId }
      });
    }
    return this.getCart(sessionId);
  }
}
