import Link from "next/link";
import { LEVELS } from "@/lib/levels";
import { TEXTS } from "@/lib/texts";
import type { Level } from "@/lib/types";

const LEVEL_ACCENTS: Record<Level, string> = {
  A1: "from-sky-400/20 to-sky-500/5",
  A2: "from-blue-400/20 to-blue-500/5",
  B1: "from-blue-500/20 to-indigo-500/5",
  B2: "from-indigo-400/20 to-indigo-500/5",
  C1: "from-violet-400/20 to-violet-500/5",
  C2: "from-fuchsia-400/20 to-fuchsia-500/5",
};

export function LevelGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVELS.map((level) => {
        const count = TEXTS.filter((text) => text.level === level.id).length;
        return (
          <Link
            key={level.id}
            href={`/practicar/${level.id.toLowerCase()}`}
            className={`group relative overflow-hidden rounded-2xl border border-border-default bg-surface p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
          >
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${LEVEL_ACCENTS[level.id]}`}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white">
                  {level.id}
                </span>
                <span className="rounded-full border border-border-default bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                  {count} textos
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{level.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {level.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Practicar
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
