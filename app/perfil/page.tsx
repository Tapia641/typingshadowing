import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileView } from "@/components/ProfileView";
import { getProfileData } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Mi perfil",
  description: "Tus estadísticas guardadas de Typing Shadowing.",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function PerfilPage() {
  const state = await getProfileData();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
        <ProfileView state={state} />
      </main>
      <Footer />
    </>
  );
}
