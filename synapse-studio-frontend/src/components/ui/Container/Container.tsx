import styles from "./Container.module.css";

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
