import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminView } from "@/components/AdminView";
import { getAdminData } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Administración",
  description: "Panel de administración de Typing Shadowing.",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminPage() {
  const state = await getAdminData();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
        <AdminView state={state} />
      </main>
      <Footer />
    </>
  );
}
