import { sampleMonthLabel, sampleProfile } from "@/data/sample";

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {sampleMonthLabel}
          <span className="mx-2 text-slate-600">·</span>
          Sample data
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-white">{sampleProfile.name}</p>
          <p className="text-xs text-slate-400">{sampleProfile.role}</p>
        </div>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/30 text-sm font-semibold text-violet-100"
        >
          {sampleProfile.initials}
        </span>
      </div>
    </header>
  );
}
