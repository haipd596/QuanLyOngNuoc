import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Xác thực')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('Đăng ký tài khoản thành công')
  @ApiStandardResponse('Đăng ký tài khoản thành công', 201)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ResponseMessage('Đăng nhập thành công')
  @ApiStandardResponse('Đăng nhập thành công')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ResponseMessage('Làm mới token thành công')
  @ApiStandardResponse('Làm mới token thành công')
  refresh(@Headers('x-refresh-token') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Thiếu header x-refresh-token');
    }
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ResponseMessage('Lấy thông tin tài khoản thành công')
  @ApiBearerAuth('BearerAuth')
  @ApiStandardResponse('Lấy thông tin tài khoản thành công')
  me(@Req() req: Request & { user?: { sub: string } }) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('Không tìm thấy người dùng trong token');
    }
    return this.authService.me(req.user.sub);
  }
}
