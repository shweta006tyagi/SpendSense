import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

type AppShellProps = {
  /** The page URL, such as "/" or "/settings". Used to highlight the sidebar. */
  currentPath: string;
  children: ReactNode;
};

/**
 * Shared frame for every screen: sidebar, header, then the page content.
 * Each page passes its own path so we do not need browser-only code.
 */
export function AppShell({ currentPath, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#070d1a] text-slate-100">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
        <Sidebar currentPath={currentPath} />
        <div className="min-w-0">
          <Header />
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
