import { PrismaClient } from '@prisma/client';
import 'server-only';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }

    return Reflect.get(globalForPrisma.prisma, prop);
  },
});
