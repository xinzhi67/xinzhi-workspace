import styles from "./UiGrid.module.css";

/** `templateColumns` 传入任意合法 `grid-template-columns` 字符串，如 `repeat(3, 1fr)` */
export function UiGrid({
  templateColumns,
  gap = 12,
  children,
  className,
}: {
  templateColumns: string;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[styles.grid, className].filter(Boolean).join(" ")}
      style={{
        gridTemplateColumns: templateColumns,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
