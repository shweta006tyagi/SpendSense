"use client";

import { AppShell } from "@/components/AppShell";
import { CategoryChart } from "@/components/CategoryChart";
import { MonthlyChart } from "@/components/MonthlyChart";
import { SummaryCard } from "@/components/SummaryCard";
import { TransactionList } from "@/components/TransactionList";
import { useTransactions } from "@/context/TransactionContext";

export default function HomePage() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.amount < 0 && transaction.category !== "Savings"
    )
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const totalSavings = transactions
    .filter((transaction) => transaction.category === "Savings")
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const availableBalance = totalIncome - totalExpenses - totalSavings;

  const summaryCards = [
    {
      id: "income",
      label: "Total Income",
      amount: totalIncome,
      detail: "Based on your transactions",
    },
    {
      id: "expenses",
      label: "Total Expenses",
      amount: totalExpenses,
      detail: "Excluding savings transfers",
    },
    {
      id: "balance",
      label: "Available Balance",
      amount: availableBalance,
      detail: "Income minus expenses and savings",
    },
    {
      id: "savings",
      label: "Savings",
      amount: totalSavings,
      detail: "Based on savings transactions",
    },
  ];

  return (
    <AppShell currentPath="/">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-400">
        Your financial overview is calculated from your transactions.
      </p>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <MonthlyChart />
        </div>
        <div className="xl:col-span-2">
          <CategoryChart />
        </div>
      </section>

      <div className="mt-6">
        <TransactionList />
      </div>
    </AppShell>
  );
}
