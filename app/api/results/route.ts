import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { results } from "@/lib/db/schema";
import type { Level } from "@/lib/types";

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json(
      { error: "Base de datos no configurada" },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const body = payload as Partial<{
    level: string;
    textId: string;
    title: string;
    wpm: number;
    accuracy: number;
    errors: number;
    seconds: number;
  }>;

  if (
    !body.level ||
    !LEVELS.has(body.level) ||
    typeof body.textId !== "string" ||
    typeof body.title !== "string" ||
    !Number.isFinite(body.wpm) ||
    !Number.isFinite(body.accuracy) ||
    !Number.isFinite(body.errors) ||
    !Number.isFinite(body.seconds)
  ) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  await db.insert(results).values({
    userId: session.user.id,
    level: body.level as Level,
    textId: body.textId,
    title: body.title,
    wpm: Math.round(body.wpm as number),
    accuracy: Math.round(body.accuracy as number),
    errors: Math.round(body.errors as number),
    seconds: Math.round(body.seconds as number),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
