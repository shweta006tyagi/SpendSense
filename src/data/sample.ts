/**
 * Fictional sample data for the first SpendSense dashboard.
 * Nothing here comes from a bank, a CSV file, or an AI API.
 * November 2026 is the sample month shown across the page.
 */

export type SummaryCard = {
  id: string;
  label: string;
  amount: number;
  detail: string;
};

export type MonthlyTotal = {
  month: string;
  income: number;
  expenses: number;
};

export type CategorySpend = {
  category: string;
  amount: number;
};

export type Transaction = {
  id: string;
  name: string;
  category: string;
  date: string;
  /** Positive numbers are income. Negative numbers are expenses. */
  amount: number;
};

export const sampleProfile = {
  name: "Sample User",
  role: "BTech CSE",
  initials: "SU",
};

export const sampleMonthLabel = "November 2026";

const novemberIncome = 92000;
const novemberExpenses = 61450;
const novemberSavings = 12500;

/** Income minus expenses minus the amount set aside as savings. */
const availableBalance = novemberIncome - novemberExpenses - novemberSavings;

export const summaryCards: SummaryCard[] = [
  {
    id: "income",
    label: "Total Income",
    amount: novemberIncome,
    detail: "Received in the sample month",
  },
  {
    id: "expenses",
    label: "Total Expenses",
    amount: novemberExpenses,
    detail: "Spent in the sample month",
  },
  {
    id: "balance",
    label: "Available Balance",
    amount: availableBalance,
    detail: "Income − expenses − savings",
  },
  {
    id: "savings",
    label: "Savings",
    amount: novemberSavings,
    detail: "Set aside in the sample month",
  },
];

/** Income and expenses for each month. November matches the summary cards. */
export const monthlyTotals: MonthlyTotal[] = [
  { month: "Jan", income: 78000, expenses: 51200 },
  { month: "Feb", income: 80000, expenses: 49800 },
  { month: "Mar", income: 82000, expenses: 54600 },
  { month: "Apr", income: 85000, expenses: 57300 },
  { month: "May", income: 84000, expenses: 60100 },
  { month: "Jun", income: 88000, expenses: 55900 },
  { month: "Jul", income: 86000, expenses: 62400 },
  { month: "Aug", income: 90000, expenses: 58750 },
  { month: "Sep", income: 87500, expenses: 54300 },
  { month: "Oct", income: 91000, expenses: 63200 },
  { month: "Nov", income: novemberIncome, expenses: novemberExpenses },
];

/**
 * November spending by category.
 * These six amounts add up to the Total Expenses card (₹61,450).
 */
export const categorySpending: CategorySpend[] = [
  { category: "Food", amount: 14200 },
  { category: "Shopping", amount: 9800 },
  { category: "Travel", amount: 12600 },
  { category: "Bills", amount: 15450 },
  { category: "Education", amount: 6200 },
  { category: "Others", amount: 3200 },
];

export const recentTransactions: Transaction[] = [
  {
    id: "txn-1",
    name: "Campus stipend",
    category: "Income",
    date: "01 Nov 2026",
    amount: 92000,
  },
  {
    id: "txn-2",
    name: "Hostel mess",
    category: "Food",
    date: "03 Nov 2026",
    amount: -4500,
  },
  {
    id: "txn-3",
    name: "City metro pass",
    category: "Travel",
    date: "05 Nov 2026",
    amount: -1200,
  },
  {
    id: "txn-4",
    name: "Electricity bill",
    category: "Bills",
    date: "08 Nov 2026",
    amount: -2100,
  },
  {
    id: "txn-5",
    name: "Textbook store",
    category: "Education",
    date: "12 Nov 2026",
    amount: -1850,
  },
  {
    id: "txn-6",
    name: "Weekend market",
    category: "Shopping",
    date: "16 Nov 2026",
    amount: -2400,
  },
  {
    id: "txn-7",
    name: "Savings transfer",
    category: "Savings",
    date: "20 Nov 2026",
    amount: -12500,
  },
  {
    id: "txn-8",
    name: "Cafe study group",
    category: "Food",
    date: "22 Nov 2026",
    amount: -640,
  },
];

export const navItems = [
  { href: "/", label: "Dashboard", comingSoon: false },
  { href: "/transactions", label: "Transactions", comingSoon: true },
  { href: "/analytics", label: "Analytics", comingSoon: true },
  { href: "/ai-assistant", label: "AI Assistant", comingSoon: true },
  { href: "/settings", label: "Settings", comingSoon: true },
] as const;
