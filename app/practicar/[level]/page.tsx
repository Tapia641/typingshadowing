import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PracticeBoard } from "@/components/PracticeBoard";
import { AdSlot } from "@/components/AdSlot";
import { LEVELS, isLevel, getLevelMeta } from "@/lib/levels";
import { getTextsByLevel } from "@/lib/texts";
import type { Level } from "@/lib/types";

export function generateStaticParams() {
  return LEVELS.map((level) => ({ level: level.id.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const upper = level.toUpperCase();
  if (!isLevel(upper)) return {};
  const meta = getLevelMeta(upper);
  return {
    title: `Practicar inglés ${upper} (${meta.name}) tipeando y escuchando`,
    description: `Practica inglés nivel ${upper} (${meta.name}) con typing shadowing: ${meta.description} Escucha la pronunciación de cada palabra al escribirla.`,
    alternates: { canonical: `/practicar/${level}` },
  };
}

export const instant = false;

export default async function LevelPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ texto?: string }>;
}) {
  const { level } = await params;
  const { texto } = await searchParams;
  const upper = level.toUpperCase();
  if (!isLevel(upper)) notFound();
  const meta = getLevelMeta(upper);
  const texts = getTextsByLevel(upper as Level);
  const initialTextId =
    texto && texts.some((text) => text.id === texto) ? texto : undefined;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Migas">
          <Link href="/practicar" className="hover:text-accent">
            Niveles
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{upper}</span>
        </nav>

        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-contrast">
            Nivel {upper} · {meta.name}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Practicar inglés {upper}
          </h1>
          <p className="mt-3 text-muted-foreground">{meta.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {texts.length} textos disponibles en este nivel.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {texts.length} textos disponibles en este nivel
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {texts.map((text, index) => (
              <li key={text.id}>
                <Link
                  href={`/practicar/${level}?texto=${text.id}`}
                  scroll={false}
                  className="flex items-center gap-3 rounded-xl border border-border-default bg-surface px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="truncate">{text.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <PracticeBoard level={upper as Level} initialTextId={initialTextId} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <AdSlot format="rectangle" label="Publicidad" />
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {LEVELS.map((item) => (
            <Link
              key={item.id}
              href={`/practicar/${item.id.toLowerCase()}`}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (item.id === upper
                  ? "border-accent bg-accent text-white"
                  : "border-border-default hover:border-accent hover:text-accent")
              }
            >
              {item.id}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
