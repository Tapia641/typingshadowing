import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignInPanel } from "@/components/auth/SignInPanel";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description:
    "Inicia sesión con Google para guardar tus estadísticas de Typing Shadowing y ver tu perfil.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <SignInPanel />
      </main>
      <Footer />
    </>
  );
}
