import type { SummaryCard as SummaryCardData } from "@/data/sample";
import { formatRupees } from "@/lib/format";

const accentById: Record<string, string> = {
  income: "bg-emerald-400",
  expenses: "bg-rose-400",
  balance: "bg-violet-400",
  savings: "bg-sky-400",
};

type SummaryCardProps = {
  card: SummaryCardData;
};

export function SummaryCard({ card }: SummaryCardProps) {
  const accent = accentById[card.id] ?? "bg-violet-400";

  return (
    <article className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accent}`} aria-hidden="true" />
        <h2 className="text-sm font-medium text-slate-300">{card.label}</h2>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
        {formatRupees(card.amount)}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{card.detail}</p>
    </article>
  );
}
