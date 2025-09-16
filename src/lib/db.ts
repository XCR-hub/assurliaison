import 'server-only';
import { PrismaClient } from '@prisma/client';

// The Prisma client must only be instantiated once per server.
// In development we attach it to the global object so that hot reload
// doesn't create many clients.
const g = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  g.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: ['error']
  });

if (process.env.NODE_ENV !== 'production') g.prisma = prisma;