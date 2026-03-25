import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

function buildMysqlUrlFromParts(): string | null {
  const host = process.env.MYSQLHOST;
  const port = process.env.MYSQLPORT ?? '3306';
  const user = process.env.MYSQLUSER;
  const password = process.env.MYSQLPASSWORD;
  const database = process.env.MYSQLDATABASE;

  if (!host || !user || !password || !database) {
    return null;
  }

  return `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.MYSQL_URL,
    process.env.MYSQL_PRIVATE_URL,
    process.env.MYSQL_PUBLIC_URL,
    buildMysqlUrlFromParts(),
  ].filter((value): value is string => Boolean(value && value.trim()));

  const selected = candidates[0];
  if (!selected) {
    throw new Error(
      'Thiếu cấu hình database. Cần đặt DATABASE_URL hoặc MYSQL_URL (hoặc MYSQLHOST/MYSQLUSER/MYSQLPASSWORD/MYSQLDATABASE).',
    );
  }

  const hasRailwayParts = Boolean(process.env.MYSQLHOST && process.env.MYSQLUSER && process.env.MYSQLPASSWORD);
  if (selected.includes('@localhost:') && process.env.NODE_ENV === 'production' && hasRailwayParts) {
    const fallback = buildMysqlUrlFromParts();
    if (fallback) {
      return fallback;
    }
  }

  return selected;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: resolveDatabaseUrl(),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
