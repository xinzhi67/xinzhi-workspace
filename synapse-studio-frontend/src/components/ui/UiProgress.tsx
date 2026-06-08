import styles from "./UiProgress.module.css";

export function UiProgress({
  value,
  max = 100,
  className,
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={[styles.progress, className].filter(Boolean).join(" ")}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={styles.progressBar} style={{ width: `${pct}%` }} />
    </div>
  );
}
