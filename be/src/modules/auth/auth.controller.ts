import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

@Controller('auth')
@ApiTags('Xac thuc')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('Dang ky tai khoan thanh cong')
  @ApiStandardResponse('Dang ky tai khoan thanh cong', 201)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ResponseMessage('Dang nhap thanh cong')
  @ApiStandardResponse('Dang nhap thanh cong')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ResponseMessage('Lam moi token thanh cong')
  @ApiStandardResponse('Lam moi token thanh cong')
  refresh(@Headers('x-refresh-token') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Thieu header x-refresh-token');
    }
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ResponseMessage('Lay thong tin tai khoan thanh cong')
  @ApiBearerAuth('BearerAuth')
  @ApiStandardResponse('Lay thong tin tai khoan thanh cong')
  me(@Req() req: Request & { user?: { sub: string } }) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('Khong tim thay nguoi dung trong token');
    }
    return this.authService.me(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ResponseMessage('Cap nhat thong tin ca nhan thanh cong')
  @ApiBearerAuth('BearerAuth')
  @ApiStandardResponse('Cap nhat thong tin ca nhan thanh cong')
  updateMe(
    @Req() req: Request & { user?: { sub: string } },
    @Body() dto: UpdateMyProfileDto,
  ) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('Khong tim thay nguoi dung trong token');
    }
    return this.authService.updateMe(req.user.sub, dto);
  }
}
