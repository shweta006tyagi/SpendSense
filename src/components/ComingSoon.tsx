type ComingSoonProps = {
  title: string;
  description: string;
};

/** Honest placeholder for a screen that is not built yet. */
export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="rounded-2xl border border-dashed border-violet-400/40 bg-[#121a2f] px-6 py-10 sm:px-8">
      <p className="text-xs font-semibold tracking-wide text-violet-300 uppercase">
        Coming soon
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
        {description}
      </p>
    </section>
  );
}
