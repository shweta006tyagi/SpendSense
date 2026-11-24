
"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useTransactions } from "@/context/TransactionContext";

export default function SettingsPage() {
  const { transactions, deleteTransaction } = useTransactions();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleClearTransactions() {
    transactions.forEach((transaction) => {
      deleteTransaction(transaction.id);
    });

    setShowConfirmation(false);
    setSuccessMessage("All transactions have been cleared successfully.");
  }

  return (
    <AppShell currentPath="/settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your SpendSense preferences and transaction data.
          </p>
        </div>

        {/* Profile Information */}
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your current demo profile information.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
              S
            </div>

            <div>
              <p className="font-semibold text-white">
                SpendSense User
              </p>
              <p className="text-sm text-slate-400">
                Demo Profile
              </p>
            </div>
          </div>

          <p className="mt-4 rounded-xl border border-purple-400/20 bg-purple-500/10 p-3 text-sm text-purple-200">
            This is a sample profile. SpendSense does not currently
            have account registration or login functionality.
          </p>
        </section>

        {/* Preferences */}
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            Preferences
          </h2>

          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0b1224] p-4">
            <div>
              <p className="font-medium text-white">
                Display Currency
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Currency used throughout SpendSense.
              </p>
            </div>

            <span className="rounded-lg bg-purple-500/10 px-3 py-2 text-sm font-semibold text-purple-300">
              INR (₹)
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0b1224] p-4">
            <div>
              <p className="font-medium text-white">
                Appearance
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Current application theme.
              </p>
            </div>

            <span className="rounded-lg bg-purple-500/10 px-3 py-2 text-sm font-semibold text-purple-300">
              Dark Mode
            </span>
          </div>
        </section>

        {/* Data Management */}
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            Data Management
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            View and manage your saved transaction records.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0b1224] p-4">
            <p className="text-sm text-slate-400">
              Total Saved Transactions
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {transactions.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Transactions currently stored in your browser.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#0b1224] p-4">
            <p className="font-medium text-white">
              Local Storage
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Your transactions are saved in your browser's local
              storage. They are not automatically synced across
              different devices or browsers.
            </p>
          </div>

          {successMessage && (
            <p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-emerald-300">
              {successMessage}
            </p>
          )}

          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                setSuccessMessage("");
                setShowConfirmation(true);
              }}
              disabled={transactions.length === 0}
              className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear All Transactions
            </button>
          </div>

          {showConfirmation && (
            <div className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/5 p-4">
              <h3 className="font-semibold text-white">
                Confirm Data Deletion
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Are you sure you want to delete all {transactions.length}
                {" "}saved transactions? This will update your dashboard,
                analytics and AI assistant. This action cannot be undone.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleClearTransactions}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
                >
                  Yes, Clear All
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        {/* About */}
        <section className="rounded-2xl border border-white/10 bg-[#121a2f] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            About SpendSense
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            SpendSense is an AI Expense Analyser project designed
            to help users track transactions, understand spending
            patterns and manage their finances.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Version 1.0.0 · Student Project
          </p>
        </section>
      </div>
    </AppShell>
  );
}

