import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
    }
    return client;
  } catch (err) {
    console.warn('[AI Studio] Database not connected — using mock PrismaClient', err);
    const noOp = {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (d: { data?: unknown }) => d?.data ?? {},
      update: async (d: { data?: unknown }) => d?.data ?? {},
      delete: async () => ({}),
    };
    return new Proxy({} as PrismaClient, {
      get: () => noOp,
    });
  }
}

export const prisma = createPrismaClient();
