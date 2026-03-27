import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { ROLE_ADMIN } from '../../common/constants/roles.constant';
import { MailService } from './mail.service';
import { TestSendMailDto } from './dto/test-send-mail.dto';

@Controller('mail')
@ApiTags('Mail')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test-send')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Gửi email test thành công')
  @ApiStandardResponse('Gửi email test thành công', 201)
  testSend(@Body() dto: TestSendMailDto) {
    return this.mailService.sendTestMail(dto);
  }
}
