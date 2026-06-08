import styles from "./UiDivider.module.css";

export function UiDivider({ className }: { className?: string }) {
  return <hr className={[styles.divider, className].filter(Boolean).join(" ")} />;
}
