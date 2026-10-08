import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { results } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Devuelve los IDs de los textos que el usuario ya completó (según sus
 * resultados guardados). Sin sesión o sin base de datos, devuelve una lista
 * vacía para que el cliente use su propio almacenamiento local.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !db) {
    return NextResponse.json({ textIds: [] });
  }

  const rows = await db
    .selectDistinct({ textId: results.textId })
    .from(results)
    .where(eq(results.userId, session.user.id));

  return NextResponse.json({ textIds: rows.map((row) => row.textId) });
}
