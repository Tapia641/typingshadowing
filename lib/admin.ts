import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { results, users } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
}

export interface AdminData {
  users: AdminUser[];
  totalUsers: number;
  totalResults: number;
}

export type AdminState =
  | { status: "unauthorized" }
  | { status: "ready"; data: AdminData };

export async function getAdminData(): Promise<AdminState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { status: "unauthorized" };
  }

  if (!db) {
    return { status: "ready", data: { users: [], totalUsers: 0, totalResults: 0 } };
  }

  const [userRows, resultCount] = await Promise.all([
    db.select().from(users).orderBy(desc(users.createdAt)).limit(200),
    db.select({ value: count() }).from(results),
  ]);

  return {
    status: "ready",
    data: {
      users: userRows,
      totalUsers: userRows.length,
      totalResults: resultCount[0]?.value ?? 0,
    },
  };
}

export function adminRedirect() {
  redirect("/iniciar-sesion");
}
