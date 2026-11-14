export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function TagList({ tags, className = "" }: { tags: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {tags.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}
