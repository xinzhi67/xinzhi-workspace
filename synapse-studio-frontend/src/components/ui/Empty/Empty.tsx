import styles from "./Empty.module.css";

export function UiEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={styles.empty}>
      <strong style={{ color: "var(--color-text)", fontSize: "0.95rem" }}>
        {title}
      </strong>
      {description ? (
        <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
          {description}
        </span>
      ) : null}
      {action}
    </div>
  );
}
