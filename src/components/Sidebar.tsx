import Link from "next/link";
import { navItems } from "@/data/sample";

type SidebarProps = {
  currentPath: string;
};

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="border-b border-white/10 bg-[#0b1224] lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
      <div className="flex items-center gap-3 px-4 py-4 lg:px-5 lg:py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-sm font-bold text-white">
          SS
        </span>
        <div>
          <p className="text-base font-semibold tracking-tight text-white">
            SpendSense
          </p>
          <p className="text-xs text-slate-400">AI Expense Analyser</p>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-3 lg:pb-6"
      >
        {navItems.map((item) => {
          const isActive = item.href === currentPath;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-10 shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-violet-500/20 text-violet-100"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              {item.comingSoon ? (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-violet-200 uppercase">
                  Soon
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
