// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

// NOTE: For production, use a connection pool like this:
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

let adapter: PrismaPg;
if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString });
  adapter = new PrismaPg(pool);
} else {
  // For development, create a new adapter for each request
  // This is not ideal for production but works for development
  adapter = new PrismaPg(new Pool({ connectionString }));
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
