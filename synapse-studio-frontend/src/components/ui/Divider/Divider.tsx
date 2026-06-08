import styles from "./Divider.module.css";

export function UiDivider({ className }: { className?: string }) {
  return <hr className={[styles.divider, className].filter(Boolean).join(" ")} />;
}
