import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LevelGrid } from "@/components/LevelGrid";
import { AdSlot } from "@/components/AdSlot";
import { TEXTS } from "@/lib/texts";
import { LEVELS } from "@/lib/levels";

export const metadata: Metadata = {
  title: "Elige tu nivel y practica inglés tipeando (A1 a C2)",
  description:
    "Selecciona tu nivel MCER (A1, A2, B1, B2, C1, C2) y practica typing shadowing con textos adaptados a cada nivel. Escucha la pronunciación de cada palabra.",
  alternates: { canonical: "/practicar" },
};

export default function PracticarPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Elige tu nivel
          </h1>
          <p className="mt-3 text-muted-foreground">
            Cada nivel MCER tiene sus propios textos. Elige dónde quieres
            practicar y empieza a tipear escuchando cada palabra.
          </p>
        </div>

        <div className="mt-10">
          <LevelGrid />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <AdSlot format="horizontal" label="Publicidad" />
        </div>

        <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border-default bg-surface p-6">
          <h2 className="text-lg font-semibold">Banco de textos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {TEXTS.length} textos repartidos en {LEVELS.length} niveles. Cada
            texto está adaptado a la complejidad de su nivel.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LEVELS.map((level) => (
              <li key={level.id}>
                <Link
                  href={`/practicar/${level.id.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border-default px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="font-semibold">{level.id}</span>
                  <span className="text-muted-foreground">
                    {TEXTS.filter((t) => t.level === level.id).length} textos
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
