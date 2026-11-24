import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function AnalyticsPage() {
  return (
    <AppShell currentPath="/analytics">
      <ComingSoon
        title="Analytics"
        description="A deeper analytics screen is not built yet. The dashboard charts are a first look at the same fictional sample data."
      />
    </AppShell>
  );
}
