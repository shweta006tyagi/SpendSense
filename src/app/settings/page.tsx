import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function SettingsPage() {
  return (
    <AppShell currentPath="/settings">
      <ComingSoon
        title="Settings"
        description="Profile and preference settings are not built yet. The name in the header is a sample profile, not a signed-in account."
      />
    </AppShell>
  );
}
