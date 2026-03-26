import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../config/prisma.service';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  id?: string;
  sub?: string;
  email?: string;
  name?: string;
};

@Injectable()
export class OauthGoogleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  buildAuthorizationUrl() {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const callbackUrl = this.configService.get<string>('GOOGLE_CALLBACK_URL');

    if (!clientId || !callbackUrl) {
      throw new BadRequestException('Thiếu cấu hình GOOGLE_CLIENT_ID hoặc GOOGLE_CALLBACK_URL');
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: callbackUrl,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async loginWithGoogleCode(code: string) {
    const googleUser = await this.fetchGoogleUserInfo(code);
    const googleId = googleUser.id ?? googleUser.sub;

    if (!googleUser.email || !googleId) {
      throw new UnauthorizedException('Không thể lấy thông tin email từ Google');
    }

    const normalizedEmail = googleUser.email.toLowerCase().trim();
    const existingByGoogleId = await this.prisma.user.findUnique({
      where: { googleId },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

    if (existingByGoogleId && existingByGoogleId.email !== normalizedEmail) {
      throw new BadRequestException('Google account đã liên kết với email khác');
    }

    const existingByEmail = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

    let user = existingByGoogleId ?? existingByEmail;
    if (user) {
      if (user.googleId && user.googleId !== googleId) {
        throw new BadRequestException('Tài khoản đã liên kết Google khác');
      }
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          avatarUrl: user.avatarUrl ?? null,
        },
        include: {
          role: {
            select: { name: true },
          },
        },
      });
    } else {
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: 'USER' },
        select: { id: true },
      });

      user = await this.prisma.user.create({
        data: {
          fullName: googleUser.name?.trim() || normalizedEmail.split('@')[0] || 'Google User',
          email: normalizedEmail,
          googleId,
          roleId: defaultRole?.id,
        },
        include: {
          role: {
            select: { name: true },
          },
        },
      });
    }

    const tokens = await this.issueTokens({
      sub: user.id,
      email: user.email,
      role: user.role?.name ?? 'USER',
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        role: user.role?.name ?? 'USER',
        googleId: user.googleId,
      },
    };
  }

  private async fetchGoogleUserInfo(code: string): Promise<GoogleUserInfo> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackUrl = this.configService.get<string>('GOOGLE_CALLBACK_URL');
    if (!clientId || !clientSecret || !callbackUrl) {
      throw new BadRequestException(
        'Thiếu cấu hình GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET hoặc GOOGLE_CALLBACK_URL',
      );
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUrl,
        grant_type: 'authorization_code',
      }),
    });

    const tokenBody = (await tokenResponse.json()) as GoogleTokenResponse;
    if (!tokenResponse.ok || !tokenBody.access_token) {
      throw new UnauthorizedException(
        tokenBody.error_description || tokenBody.error || 'Không thể xác thực với Google',
      );
    }

    const profileResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenBody.access_token}`,
        },
      },
    );
    if (!profileResponse.ok) {
      throw new UnauthorizedException('Không lấy được profile Google');
    }

    return (await profileResponse.json()) as GoogleUserInfo;
  }

  private async issueTokens(payload: JwtPayload) {
    const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET') ?? '';
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') ?? '';

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
