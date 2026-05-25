import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { static as expressStatic } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const uploadsRoot = join(process.cwd(), 'uploads');
  const uploadsProductsRoot = join(uploadsRoot, 'products');
  const uploadsBillsRoot = join(uploadsRoot, 'bills');
  if (!existsSync(uploadsRoot)) {
    mkdirSync(uploadsRoot, { recursive: true });
  }
  if (!existsSync(uploadsProductsRoot)) {
    mkdirSync(uploadsProductsRoot, { recursive: true });
  }
  if (!existsSync(uploadsBillsRoot)) {
    mkdirSync(uploadsBillsRoot, { recursive: true });
  }
  app.use('/uploads', expressStatic(uploadsRoot));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tài liệu hệ thống Quản Lý Ống Nước Việt')
    .setDescription('Tài liệu giao tiếp dịch vụ cho hệ thống quản lý bán vật liệu điện nước')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Nhập access token dạng: Bearer <token>',
      },
      'BearerAuth',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
    customSiteTitle: 'Tài liệu hệ thống Quản Lý Ống Nước Việt',
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap();
