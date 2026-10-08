import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PracticeBoard } from "@/components/PracticeBoard";
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
  const texts = getTextsByLevel(upper as Level);
  const initialTextId =
    texto && texts.some((text) => text.id === texto) ? texto : undefined;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <PracticeBoard
          level={upper as Level}
          texts={texts}
          initialTextId={initialTextId}
        />
      </main>
      <Footer />
    </>
  );
}
