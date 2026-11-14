type Props = { title: string; subtitle: string; note?: string; href?: string };

/** Small square card used in the horizontally scrolling rows (coursework, clubs). */
export function InfoBox({ title, subtitle, note, href }: Props) {
  const frame = "box block h-full min-h-[150px] w-[150px]";
  const body = (
    <>
      <h3 className={`font-bold ${title.length > 16 ? "text-[0.9em]" : "text-[1.17em]"}`}>{title}</h3>
      <p>{subtitle}</p>
      {note ? <p className="mt-3 text-xs">{note}</p> : null}
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${frame} transition-shadow duration-150 ease-out hover:shadow-[0_0_2.5px_var(--highlight)]`}
    >
      {body}
    </a>
  ) : (
    <div className={frame}>{body}</div>
  );
}
