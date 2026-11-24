import { AppShell } from "@/components/AppShell";
import { CategoryChart } from "@/components/CategoryChart";
import { MonthlyChart } from "@/components/MonthlyChart";
import { SummaryCard } from "@/components/SummaryCard";
import { TransactionList } from "@/components/TransactionList";
import { summaryCards } from "@/data/sample";

export default function HomePage() {
  return (
    <AppShell currentPath="/">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-400">
        This overview uses fictional sample money only. Bank connections, CSV
        upload, and the AI assistant are coming soon.
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
