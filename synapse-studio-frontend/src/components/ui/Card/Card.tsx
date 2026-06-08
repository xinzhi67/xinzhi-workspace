import styles from "./Card.module.css";

export type UiCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  /** 与链接等组合时用于 hover 抬起 */
  interactive?: boolean;
};

export function UiCard({
  title,
  children,
  className,
  interactive,
}: UiCardProps) {
  const root = [
    styles.card,
    interactive ? styles.cardInteractive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={root}>
      {title ? <div className={styles.cardTitle}>{title}</div> : null}
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
