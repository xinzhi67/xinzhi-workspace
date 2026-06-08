import styles from "./UiContainer.module.css";

export function UiContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
