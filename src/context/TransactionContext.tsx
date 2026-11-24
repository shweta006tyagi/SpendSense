"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Transaction } from "@/data/sample";

type TransactionContextType = {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    addTransactions: (newTransactions: Transaction[]) => void;
    deleteTransaction: (id: string) => void;
  };

const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

const STORAGE_KEY = "spendsense-transactions";

export function TransactionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved transactions when the app opens.
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem(STORAGE_KEY);

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions) as Transaction[]);
      }
    } catch (error) {
      console.error("Could not load transactions:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save transactions whenever the list changes.
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions, isLoaded]);

  function addTransaction(transaction: Transaction) {
    setTransactions((previous) => [transaction, ...previous]);
  }
  function addTransactions(newTransactions: Transaction[]) {
    setTransactions((previous) => [
      ...newTransactions,
      ...previous,
    ]);
  }
  function deleteTransaction(id: string) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  return (
    <TransactionContext.Provider
    value={{
        transactions,
        addTransaction,
        addTransactions,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}