export function FaqItem({
  item,
}: {
  item: { question: string; answer: string };
}) {
  return (
    <details className="group rounded-2xl border border-border-default bg-surface p-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        <span>{item.question}</span>
        <span
          aria-hidden="true"
          className="text-muted-foreground transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="px-5 pb-5 text-sm text-muted-foreground">{item.answer}</p>
    </details>
  );
}
