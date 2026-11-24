"use client";

import { AppShell } from "@/components/AppShell";
import { CategoryChart } from "@/components/CategoryChart";
import { MonthlyChart } from "@/components/MonthlyChart";
import { useTransactions } from "@/context/TransactionContext";
import { formatRupees } from "@/lib/format";

export default function AnalyticsPage() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.amount < 0 && transaction.category !== "Savings"
    )
    .reduce(
      (sum, transaction) => sum + Math.abs(transaction.amount),
      0
    );

  const totalSavings = transactions
    .filter((transaction) => transaction.category === "Savings")
    .reduce(
      (sum, transaction) => sum + Math.abs(transaction.amount),
      0
    );

  const netBalance = totalIncome - totalExpenses - totalSavings;

  const expenseTransactions = transactions.filter(
    (transaction) =>
      transaction.amount < 0 && transaction.category !== "Savings"
  );

  const averageExpense =
    expenseTransactions.length > 0
      ? totalExpenses / expenseTransactions.length
      : 0;

  const analyticsCards = [
    {
      title: "Total Income",
      amount: totalIncome,
      color: "text-emerald-300",
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      color: "text-rose-300",
    },
    {
      title: "Net Balance",
      amount: netBalance,
      color: "text-violet-300",
    },
    {
      title: "Total Savings",
      amount: totalSavings,
      color: "text-sky-300",
    },
  ];

  return (
    <AppShell currentPath="/analytics">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Financial Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Understand your income, expenses, savings and spending patterns.
          </p>
        </div>

        {/* Financial summary */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analyticsCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#121a2f] p-5"
            >
              <p className="text-sm text-slate-400">{card.title}</p>
              <p className={`mt-3 text-2xl font-bold ${card.color}`}>
                {formatRupees(card.amount)}
              </p>
            </div>
          ))}
        </section>

        {/* Transaction activity */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">Total Transactions</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {transactions.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">Average Expense</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {formatRupees(averageExpense)}
            </p>
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-4 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <MonthlyChart />
          </div>

          <div className="xl:col-span-2">
            <CategoryChart />
          </div>
        </section>

        {/* Spending insights */}
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
          <h2 className="text-base font-semibold text-white">
            Spending Overview
          </h2>

          {totalExpenses === 0 ? (
            <p className="mt-3 text-sm text-slate-400">
              Add some expenses to start analysing your spending patterns.
            </p>
          ) : (
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                You have recorded{" "}
                <span className="font-semibold text-white">
                  {expenseTransactions.length}
                </span>{" "}
                expense transactions.
              </p>

              <p>
                Your average expense transaction is{" "}
                <span className="font-semibold text-white">
                  {formatRupees(averageExpense)}
                </span>.
              </p>

              <p>
                Your current net balance is{" "}
                <span className="font-semibold text-violet-300">
                  {formatRupees(netBalance)}
                </span>.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
