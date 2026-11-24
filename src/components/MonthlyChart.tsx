import { monthlyTotals } from "@/data/sample";
import { formatRupees, formatRupeesCompact } from "@/lib/format";

export function MonthlyChart() {
  const highest = Math.max(
    ...monthlyTotals.flatMap((month) => [month.income, month.expenses]),
  );
  const november = monthlyTotals.find((month) => month.month === "Nov");

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            Monthly income and expenses
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Sample data for January–November 2026. “k” means thousands of
            rupees, so ₹92k is ₹92,000.
          </p>
        </div>
        <div className="flex gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-violet-400" />
            Income
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-400" />
            Expenses
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <div className="flex h-48 flex-col justify-between pb-6 text-[11px] text-slate-500">
          <span>{formatRupeesCompact(highest)}</span>
          <span>{formatRupeesCompact(highest / 2)}</span>
          <span>₹0</span>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-11 gap-1 sm:gap-2">
          {monthlyTotals.map((month) => (
            <div key={month.month} className="flex flex-col items-center">
              <div className="flex h-48 w-full items-end justify-center gap-1">
                <div
                  className="w-2 rounded-t bg-violet-400 sm:w-3"
                  style={{ height: `${(month.income / highest) * 100}%` }}
                  title={`${month.month} income ${formatRupees(month.income)}`}
                />
                <div
                  className="w-2 rounded-t bg-rose-400 sm:w-3"
                  style={{ height: `${(month.expenses / highest) * 100}%` }}
                  title={`${month.month} expenses ${formatRupees(month.expenses)}`}
                />
              </div>
              <span className="mt-2 text-[10px] text-slate-400 sm:text-xs">
                {month.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        November matches the summary cards: income{" "}
        {formatRupees(november?.income ?? 0)} and expenses{" "}
        {formatRupees(november?.expenses ?? 0)}.
      </p>

      <table className="sr-only">
        <caption>Sample monthly income and expenses for 2026</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTotals.map((month) => (
            <tr key={month.month}>
              <td>{month.month}</td>
              <td>{formatRupees(month.income)}</td>
              <td>{formatRupees(month.expenses)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
