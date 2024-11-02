import { PrismaClient } from "@prisma/client";
// global.d.ts

export declare global {
  declare module globalThis {
    var prisma: PrismaClient | undefined;
  }
}
