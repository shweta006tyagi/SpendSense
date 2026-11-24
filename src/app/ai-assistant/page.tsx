import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function AiAssistantPage() {
  return (
    <AppShell currentPath="/ai-assistant">
      <ComingSoon
        title="AI Assistant"
        description="Gemini is not connected in this version. This page does not send any questions or financial data to an AI service."
      />
    </AppShell>
  );
}
