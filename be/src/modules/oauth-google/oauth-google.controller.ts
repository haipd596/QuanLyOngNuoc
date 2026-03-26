import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { OauthGoogleService } from './oauth-google.service';

@Controller('auth/google')
@ApiTags('OAuth Google')
export class OauthGoogleController {
  constructor(private readonly oauthGoogleService: OauthGoogleService) {}

  @Get()
  @ApiStandardResponse('Chuyển hướng đăng nhập Google thành công')
  startGoogleLogin(@Res() res: Response) {
    const authUrl = this.oauthGoogleService.buildAuthorizationUrl();
    return res.redirect(authUrl);
  }

  @Get('callback')
  @ResponseMessage('Đăng nhập Google thành công')
  @ApiQuery({
    name: 'code',
    required: true,
    description: 'Authorization code trả về từ Google',
  })
  @ApiStandardResponse('Đăng nhập Google thành công')
  callback(@Query('code') code: string | undefined) {
    if (!code) {
      throw new BadRequestException('Thiếu query code từ Google');
    }
    return this.oauthGoogleService.loginWithGoogleCode(code);
  }
}

