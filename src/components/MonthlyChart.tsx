"use client";
import { useEffect, useState } from "react";

import { useTransactions } from "@/context/TransactionContext";
import { formatRupees, formatRupeesCompact } from "@/lib/format";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getTransactionMonth(date: string) {
  const [day, month, year] = date.split(" ");

  const monthIndex = monthNames.findIndex(
    (name) => name === month
  );

  if (!day || monthIndex === -1 || !year) return null;

  return {
    month: monthIndex,
    year: Number(year),
  };
}

export function MonthlyChart() {
  const { transactions } = useTransactions();

  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const monthlyTotals = monthNames.map((month, index) => {
    const monthTransactions = transactions.filter((transaction) => {
      const transactionDate = getTransactionMonth(transaction.date);

      return (
        transactionDate?.month === index &&
        currentYear !== null && transactionDate?.year === currentYear
      );
    });

    const income = monthTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = monthTransactions
      .filter(
        (transaction) =>
          transaction.amount < 0 &&
          transaction.category !== "Savings"
      )
      .reduce(
        (total, transaction) => total + Math.abs(transaction.amount),
        0
      );

    return { month, income, expenses };
  });

  const highest = Math.max(
    ...monthlyTotals.flatMap((month) => [
      month.income,
      month.expenses,
    ]),
    0
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            Monthly income and expenses
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Your actual transaction data for {currentYear}.
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

      {highest === 0 ? (
        <p className="mt-8 text-sm text-slate-400">
          No monthly data available yet. Add transactions to see your chart.
        </p>
      ) : (
        <>
          <div className="mt-6 flex gap-3">
            <div className="flex h-48 flex-col justify-between pb-6 text-[11px] text-slate-500">
              <span>{formatRupeesCompact(highest)}</span>
              <span>{formatRupeesCompact(highest / 2)}</span>
              <span>₹0</span>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-12 gap-1 sm:gap-2">
              {monthlyTotals.map((month) => (
                <div key={month.month} className="flex flex-col items-center">
                  <div className="flex h-48 w-full items-end justify-center gap-1">
                    <div
                      className="w-2 rounded-t bg-violet-400 sm:w-3"
                      style={{
                        height: `${(month.income / highest) * 100}%`,
                      }}
                      title={`${month.month} income ${formatRupees(month.income)}`}
                    />

                    <div
                      className="w-2 rounded-t bg-rose-400 sm:w-3"
                      style={{
                        height: `${(month.expenses / highest) * 100}%`,
                      }}
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

          <p className="mt-4 text-xs text-slate-500">
            The chart updates automatically when you add or delete transactions.
          </p>
        </>
      )}
    </section>
  );
}
