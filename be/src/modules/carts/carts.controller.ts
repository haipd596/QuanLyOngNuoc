import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('Giỏ hàng')
@Controller('carts')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ResponseMessage('Lấy giỏ hàng thành công')
  @ApiStandardResponse('Lấy giỏ hàng thành công')
  getCart(@Req() req: any) {
    const userId = req.user.sub ?? req.user.id;
    return this.cartsService.getCart(userId);
  }

  @Get('count')
  @ResponseMessage('Lấy số lượng sản phẩm giỏ hàng')
  countItems(@Req() req: any) {
    const userId = req.user.sub ?? req.user.id;
    return this.cartsService.countItems(userId);
  }

  @Post('add')
  @ResponseMessage('Thêm vào giỏ hàng thành công')
  @ApiStandardResponse('Thêm vào giỏ hàng thành công')
  addToCart(@Req() req: any, @Body() dto: AddToCartDto) {
    const userId = req.user.sub ?? req.user.id;
    return this.cartsService.addToCart(userId, dto);
  }

  @Patch('update/:productId')
  @ResponseMessage('Cập nhật số lượng thành công')
  @ApiStandardResponse('Cập nhật số lượng thành công')
  updateQuantity(
    @Req() req: any,
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemDto
  ) {
    const userId = req.user.sub ?? req.user.id;
    return this.cartsService.updateQuantity(userId, productId, dto.quantity);
  }

  @Delete('remove/:productId')
  @ResponseMessage('Xóa sản phẩm khỏi giỏ hàng thành công')
  @ApiStandardResponse('Xóa sản phẩm khỏi giỏ hàng thành công')
  removeItem(
    @Req() req: any,
    @Param('productId') productId: string
  ) {
    const userId = req.user.sub ?? req.user.id;
    return this.cartsService.removeItem(userId, productId);
  }
}
