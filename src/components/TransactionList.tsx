"use client";

import type { Transaction } from "@/data/sample";
import { useTransactions } from "@/context/TransactionContext";
import { formatSignedRupees } from "@/lib/format";

function amountClass(transaction: Transaction): string {
  return transaction.amount < 0
    ? "text-rose-300"
    : "text-emerald-300";
}

export function TransactionList() {
  const { transactions } = useTransactions();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
      <h2 className="text-base font-semibold text-white">
        Recent transactions
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Your latest five transactions.
      </p>

      {recentTransactions.length === 0 ? (
        <p className="mt-5 text-sm text-slate-400">
          No transactions yet. Add your first transaction to get started.
        </p>
      ) : (
        <>
          <ul className="mt-5 space-y-3 md:hidden">
            {recentTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="rounded-xl border border-white/10 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">
                      {transaction.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.category}
                      <span className="mx-1.5">·</span>
                      {transaction.date}
                    </p>
                  </div>

                  <p
                    className={`text-sm font-semibold ${amountClass(transaction)}`}
                  >
                    {formatSignedRupees(transaction.amount)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs tracking-wide text-slate-400 uppercase">
                  <th className="px-2 py-3 font-medium">Transaction</th>
                  <th className="px-2 py-3 font-medium">Category</th>
                  <th className="px-2 py-3 font-medium">Date</th>
                  <th className="px-2 py-3 text-right font-medium">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-white/5"
                  >
                    <td className="px-2 py-3 font-medium text-white">
                      {transaction.name}
                    </td>

                    <td className="px-2 py-3 text-slate-300">
                      {transaction.category}
                    </td>

                    <td className="px-2 py-3 text-slate-400">
                      {transaction.date}
                    </td>

                    <td
                      className={`px-2 py-3 text-right font-semibold ${amountClass(transaction)}`}
                    >
                      {formatSignedRupees(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
