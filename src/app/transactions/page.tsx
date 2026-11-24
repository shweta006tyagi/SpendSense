import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function TransactionsPage() {
  return (
    <AppShell currentPath="/transactions">
      <ComingSoon
        title="Transactions"
        description="Search, filters, and CSV upload are not built yet. The dashboard already shows a short list of fictional sample transactions."
      />
    </AppShell>
  );
}
