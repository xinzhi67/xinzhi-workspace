import styles from "./UiStack.module.css";

export type UiStackProps = {
  direction: "row" | "column";
  gap?: number;
  children: React.ReactNode;
  className?: string;
};

export function UiStack({
  direction,
  gap = 8,
  children,
  className,
}: UiStackProps) {
  const dir = direction === "row" ? styles.stackRow : styles.stackCol;
  return (
    <div
      className={[styles.stack, dir, className].filter(Boolean).join(" ")}
      style={{ gap }}
    >
      {children}
    </div>
  );
}
