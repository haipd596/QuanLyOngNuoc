import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
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
        data: { userId },
        include: { items: { include: { product: { include: { images: true } } } } }
      });
    }
    return cart;
  }

  async countItems(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return { count: 0 };
    
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return { count };
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
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

    return this.getCart(userId);
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) return this.removeItem(userId, productId);
    
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
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
    
    return this.getCart(userId);
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId }
      });
    }
    return this.getCart(userId);
  }
}
