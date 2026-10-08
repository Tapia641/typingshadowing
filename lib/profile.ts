import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { results } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { computeStreak, toDateKey, type StreakInfo } from "@/lib/streak";

export interface ProfileResult {
  id: string;
  level: string;
  title: string;
  wpm: number;
  accuracy: number;
  errors: number;
  seconds: number;
  createdAt: Date;
}

export interface ProfileData {
  results: ProfileResult[];
  totals: {
    sessions: number;
    bestWpm: number;
    avgWpm: number;
    avgAccuracy: number;
  };
  streak: StreakInfo;
}

export async function getProfileData(): Promise<
  { status: "unauthenticated" } | { status: "ready"; data: ProfileData }
> {
  const session = await auth();
  if (!session?.user) return { status: "unauthenticated" };

  if (!db) {
    return {
      status: "ready",
      data: {
        results: [],
        totals: { sessions: 0, bestWpm: 0, avgWpm: 0, avgAccuracy: 0 },
        streak: computeStreak([]),
      },
    };
  }

  const rows = await db
    .select()
    .from(results)
    .where(eq(results.userId, session.user.id))
    .orderBy(desc(results.createdAt))
    .limit(100);

  const sessions = rows.length;
  const bestWpm = rows.reduce((max, r) => Math.max(max, r.wpm), 0);
  const avgWpm =
    sessions === 0
      ? 0
      : Math.round(rows.reduce((sum, r) => sum + r.wpm, 0) / sessions);
  const avgAccuracy =
    sessions === 0
      ? 0
      : Math.round(rows.reduce((sum, r) => sum + r.accuracy, 0) / sessions);
  const streak = computeStreak(rows.map((r) => toDateKey(new Date(r.createdAt))));

  return {
    status: "ready",
    data: {
      results: rows.slice(0, 50),
      totals: { sessions, bestWpm, avgWpm, avgAccuracy },
      streak,
    },
  };
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/iniciar-sesion");
  return session;
}
