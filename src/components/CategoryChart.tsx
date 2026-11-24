"use client";

import { useTransactions } from "@/context/TransactionContext";
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
  const { transactions } = useTransactions();

  const categorySpending = Object.entries(
    transactions
      .filter(
        (transaction) =>
          transaction.amount < 0 && transaction.category !== "Savings"
      )
      .reduce<Record<string, number>>((totals, transaction) => {
        const category = transaction.category;
        totals[category] =
          (totals[category] ?? 0) + Math.abs(transaction.amount);
        return totals;
      }, {})
  ).map(([category, amount]) => ({ category, amount }));

  const total = categorySpending.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
      <h2 className="text-base font-semibold text-white">
        Spending by category
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Your actual expenses add up to {formatRupees(total)}.
      </p>

      {categorySpending.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">
          No expense data available yet. Add an expense to see your category
          breakdown.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {categorySpending.map((item, index) => {
            const share = Math.round((item.amount / total) * 100);
            const color = barColors[index % barColors.length];

            return (
              <li key={item.category}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-200">
                    {item.category}
                  </span>

                  <span className="text-slate-400">
                    {formatRupees(item.amount)}
                    <span className="ml-2 text-xs text-slate-500">
                      {share}%
                    </span>
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
      )}
    </section>
  );
}
