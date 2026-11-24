
"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { recentTransactions, type Transaction } from "@/data/sample";
import { formatRupees, formatSignedRupees } from "@/lib/format";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    recentTransactions
  );

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState("2026-11-24");

  function addTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!name.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      alert("Enter a name and a valid positive amount.");
      return;
    }

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      name: name.trim(),
      category: type === "income" ? "Income" : category,
      date: new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      amount: type === "income" ? numericAmount : -numericAmount,
    };

    setTransactions((previous) => [newTransaction, ...previous]);
    setName("");
    setAmount("");
  }

  function deleteTransaction(id: string) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <AppShell currentPath="/transactions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add and manage your income and expenses.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">Total Income</p>
            <p className="mt-2 text-2xl font-bold text-emerald-300">
              {formatRupees(totalIncome)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">Total Expenses</p>
            <p className="mt-2 text-2xl font-bold text-rose-300">
              {formatRupees(totalExpenses)}
            </p>
          </div>
        </div>

        <form
          onSubmit={addTransaction}
          className="space-y-4 rounded-2xl border border-white/10 bg-[#121a2f] p-5"
        >
          <h2 className="font-semibold text-white">Add Transaction</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Transaction name"
              className="rounded-lg border border-white/10 bg-[#0b1224] p-3 text-white"
              required
            />

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount (₹)"
              className="rounded-lg border border-white/10 bg-[#0b1224] p-3 text-white"
              required
            />

            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value as "income" | "expense")
              }
              className="rounded-lg border border-white/10 bg-[#0b1224] p-3 text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={type === "income"}
              className="rounded-lg border border-white/10 bg-[#0b1224] p-3 text-white disabled:opacity-50"
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Education</option>
              <option>Others</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#0b1224] p-3 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-500"
          >
            Add Transaction
          </button>
        </form>

        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
          <h2 className="mb-4 font-semibold text-white">All Transactions</h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-4"
              >
                <div>
                  <p className="font-medium text-white">{transaction.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={
                      transaction.amount < 0
                        ? "text-rose-300"
                        : "text-emerald-300"
                    }
                  >
                    {formatSignedRupees(transaction.amount)}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-sm text-rose-300 hover:text-rose-200"
                    aria-label={`Delete ${transaction.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {transactions.length === 0 && (
            <p className="text-sm text-slate-400">No transactions yet.</p>
          )}
        </section>
      </div>
    </AppShell>
  );
}

