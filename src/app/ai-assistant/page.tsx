"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useTransactions } from "@/context/TransactionContext";
import { formatRupees } from "@/lib/format";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AiAssistantPage() {
  const { transactions } = useTransactions();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm your SpendSense demo assistant. Ask me about your income, expenses or spending patterns.",
    },
  ]);

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter(
      (item) => item.amount < 0 && item.category !== "Savings"
    )
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const savings = transactions
    .filter((item) => item.category === "Savings")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
    const savingsRate =
  income > 0 ? (savings / income) * 100 : 0;

const expenseRate =
  income > 0 ? (expenses / income) * 100 : 0;

const savingsSuggestions: string[] = [];

if (transactions.length === 0) {
  savingsSuggestions.push(
    "Add some transactions to receive personalised financial suggestions."
  );
} else if (income === 0) {
  savingsSuggestions.push(
    "Record your income to make your savings analysis more meaningful."
  );
} else {
  if (savings === 0) {
    savingsSuggestions.push(
      "You have not recorded any savings transfers yet. Consider setting a realistic savings goal."
    );
  } else {
    savingsSuggestions.push(
      `Your recorded savings rate is ${savingsRate.toFixed(1)}% of your income.`
    );
  }

  if (expenseRate > 80) {
    savingsSuggestions.push(
      "Your recorded expenses are above 80% of your income. Review your spending categories and identify areas where you could reduce costs."
    );
  } else if (expenseRate > 0) {
    savingsSuggestions.push(
      "Your recorded expenses are below 80% of your income. Continue monitoring your spending."
    );
  }

  if (savings > income) {
    savingsSuggestions.push(
      "Your recorded savings transfers exceed your recorded income. Review your entries to make sure they are accurate."
    );
  }
}
    const unusualExpenses = transactions.filter((transaction) => {
      if (transaction.amount >= 0 || transaction.category === "Savings") {
        return false;
      }
    
      const sameCategoryExpenses = transactions.filter(
        (item) =>
          item.amount < 0 &&
          item.category === transaction.category &&
          item.id !== transaction.id
      );
    
      if (sameCategoryExpenses.length < 2) {
        return false;
      }
    
      const average =
        sameCategoryExpenses.reduce(
          (sum, item) => sum + Math.abs(item.amount),
          0
        ) / sameCategoryExpenses.length;
    
      return Math.abs(transaction.amount) > average * 2;
    });

  function getAnswer(text: string) {
    const query = text.toLowerCase();

    if (query.includes("income")) {
      return `Your recorded total income is ${formatRupees(income)}.`;
    }

    if (
      query.includes("expense") ||
      query.includes("spend")
    ) {
      return `Your recorded total expenses are ${formatRupees(expenses)}.`;
    }

    if (query.includes("saving")) {
      return `Your recorded savings transfers total ${formatRupees(savings)}.`;
    }

    if (
      query.includes("balance") ||
      query.includes("left")
    ) {
      return `Your calculated available balance is ${formatRupees(income - expenses - savings)}.`;
    }

    if (query.includes("transaction")) {
      return `You currently have ${transactions.length} recorded transactions.`;
    }

    if (query.includes("category")) {
      const categoryTotals = transactions
        .filter(
          (item) =>
            item.amount < 0 && item.category !== "Savings"
        )
        .reduce<Record<string, number>>((totals, item) => {
          totals[item.category] =
            (totals[item.category] ?? 0) + Math.abs(item.amount);
          return totals;
        }, {});

      const entries = Object.entries(categoryTotals);

      if (entries.length === 0) {
        return "You haven't recorded any expenses yet.";
      }

      const highest = entries.sort(
        (a, b) => b[1] - a[1]
      )[0];

      return `Your highest spending category is ${highest[0]}, with ${formatRupees(highest[1])} in recorded expenses.`;
    }

    return "I can help with your recorded income, expenses, savings, balance, transaction count and spending categories. Try asking about one of these.";
  }

  function sendMessage(text = question) {
    if (!text.trim()) return;

    const userMessage = text.trim();
    const answer = getAnswer(userMessage);

    setMessages((previous) => [
      ...previous,
      { role: "user", text: userMessage },
      { role: "assistant", text: answer },
    ]);

    setQuestion("");
  }

  const suggestions = [
    "What are my total expenses?",
    "How much income have I recorded?",
    "Which category do I spend most on?",
    "What is my available balance?",
  ];

  return (
    <AppShell currentPath="/ai-assistant">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Financial Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Explore your financial data using the SpendSense demo assistant.
          </p>
        </div>

        <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
          <p className="text-sm text-purple-200">
            Demo mode: Responses are generated using predefined rules.
            Gemini AI is not connected.
          </p>
        </div>
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
  <h2 className="font-semibold text-white">
    Unusual Expense Detection
  </h2>

  {unusualExpenses.length === 0 ? (
    <p className="mt-3 text-sm text-slate-400">
      No unusually high expenses detected based on your recorded
      category averages.
    </p>
  ) : (
    <div className="mt-4 space-y-3">
      {unusualExpenses.map((transaction) => (
        <div
          key={transaction.id}
          className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-4"
        >
          <p className="font-medium text-white">
            {transaction.name}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {transaction.category} · {transaction.date}
          </p>

          <p className="mt-2 font-semibold text-rose-300">
            {formatRupees(Math.abs(transaction.amount))}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            More than twice the average of other expenses
            in this category.
          </p>
        </div>
      ))}
    </div>
  )}
</section>
<section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5">
  <h2 className="font-semibold text-white">
    Automatic Savings Suggestions
  </h2>

  <div className="mt-4 space-y-3">
    {savingsSuggestions.map((suggestion, index) => (
      <div
        key={index}
        className="rounded-xl border border-white/10 bg-[#0b1224] p-4"
      >
        <p className="text-sm leading-6 text-slate-300">
          {suggestion}
        </p>
      </div>
    ))}
  </div>
</section>

        <section className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-[#121a2f] p-5">
          <div className="flex-1 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-4 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 bg-[#0b1224] text-slate-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-slate-400">
              Suggested questions
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 hover:border-purple-400 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about your finances..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1224] p-3 text-sm text-white outline-none focus:border-purple-400"
              />

              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-500"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </AppShell>
  );
}