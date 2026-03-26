import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OauthGoogleController } from './oauth-google.controller';
import { OauthGoogleService } from './oauth-google.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [OauthGoogleController],
  providers: [OauthGoogleService],
})
export class OauthGoogleModule {}

