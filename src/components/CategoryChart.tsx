import { categorySpending } from "@/data/sample";
import { formatRupees } from "@/lib/format";

const barColors = [
  "bg-violet-400",
  "bg-fuchsia-300",
  "bg-indigo-300",
  "bg-sky-300",
  "bg-emerald-300",
  "bg-slate-400",
];

export function CategoryChart() {
  const total = categorySpending.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
      <h2 className="text-base font-semibold text-white">Spending by category</h2>
      <p className="mt-1 text-sm text-slate-400">
        Sample November expenses. The bars add up to {formatRupees(total)}.
      </p>

      <ul className="mt-6 space-y-4">
        {categorySpending.map((item, index) => {
          const share = Math.round((item.amount / total) * 100);
          const color = barColors[index] ?? "bg-violet-400";

          return (
            <li key={item.category}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-slate-200">{item.category}</span>
                <span className="text-slate-400">
                  {formatRupees(item.amount)}
                  <span className="ml-2 text-xs text-slate-500">{share}%</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-2 rounded-full ${color}`}
                  style={{ width: `${share}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
