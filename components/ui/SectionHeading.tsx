export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="label-mono">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}
