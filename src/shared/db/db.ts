import { PrismaClient } from '@prisma/client';
import 'server-only';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient());
