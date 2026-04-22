import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('Giỏ hàng')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @Public()
  @ResponseMessage('Lấy giỏ hàng thành công')
  @ApiStandardResponse('Lấy giỏ hàng thành công')
  @ApiQuery({ name: 'sessionId', required: true, description: 'Mã session định danh giỏ hàng của khách', example: 'sess-12345' })
  getCart(@Query('sessionId') sessionId: string) {
    return this.cartsService.getCart(sessionId);
  }

  @Post('add')
  @Public()
  @ResponseMessage('Thêm vào giỏ hàng thành công')
  @ApiStandardResponse('Thêm vào giỏ hàng thành công')
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartsService.addToCart(dto);
  }

  @Patch('update/:productId')
  @Public()
  @ResponseMessage('Cập nhật số lượng thành công')
  @ApiStandardResponse('Cập nhật số lượng thành công')
  @ApiQuery({ name: 'sessionId', required: true })
  updateQuantity(
    @Query('sessionId') sessionId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemDto
  ) {
    return this.cartsService.updateQuantity(sessionId, productId, dto.quantity);
  }

  @Delete('remove/:productId')
  @Public()
  @ResponseMessage('Xóa sản phẩm khỏi giỏ hàng thành công')
  @ApiStandardResponse('Xóa sản phẩm khỏi giỏ hàng thành công')
  @ApiQuery({ name: 'sessionId', required: true })
  removeItem(
    @Query('sessionId') sessionId: string,
    @Param('productId') productId: string
  ) {
    return this.cartsService.removeItem(sessionId, productId);
  }
}
