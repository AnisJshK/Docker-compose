import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Reliably resolve directory path in ESM / Turbopack
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves directly to packages/db/.env regardless of where the app is launched from
const envPath = path.resolve(__dirname, "./.env");

dotenv.config({ path: envPath });

console.log("Resolved DATABASE_URL:", process.env.DATABASE_URL); // Debug print

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is undefined. Check env path: ${envPath}`);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prismaClient = new PrismaClient({ adapter });