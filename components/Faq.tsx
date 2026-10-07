"use client";

import { FAQ_ITEMS } from "@/lib/landing-content";
import { useI18n } from "@/lib/i18n";
import { FaqItem } from "./FaqItem";

export function Faq() {
  const { t, lang } = useI18n();

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("faq.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("faq.subtitle")}</p>
      </div>
      <div className="mt-8 space-y-3">
        {FAQ_ITEMS[lang].map((item) => (
          <FaqItem key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}
