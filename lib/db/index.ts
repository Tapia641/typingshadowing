import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Cliente Drizzle sobre la conexión HTTP de Neon (Vercel Postgres).
 * No se instancia si falta DATABASE_URL: en local sin base de datos la app
 * sigue funcionando y la persistencia queda deshabilitada.
 */
const connectionString = process.env.DATABASE_URL;

export const db = connectionString
  ? drizzle(neon(connectionString), { schema })
  : null;

export function isDatabaseEnabled(): boolean {
  return db !== null;
}

export { schema };
