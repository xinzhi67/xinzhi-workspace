import styles from "./UiButton.module.css";

export type UiButtonVariant = "primary" | "secondary" | "ghost";

export type UiButtonProps = {
  variant?: UiButtonVariant;
  children: React.ReactNode;
  className?: string;
  /** 设计稿预览：渲染为 span，无按钮语义 */
  nonInteractive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function UiButton({
  variant = "primary",
  children,
  className,
  nonInteractive,
  disabled,
  onClick,
  type = "button",
}: UiButtonProps) {
  const v = variant;
  const cls =
    v === "secondary"
      ? `${styles.btn} ${styles.btnSecondary}`
      : v === "ghost"
        ? `${styles.btn} ${styles.btnGhost}`
        : `${styles.btn} ${styles.btnPrimary}`;
  const merged = [cls, nonInteractive ? styles.btnNonInteractive : "", className]
    .filter(Boolean)
    .join(" ");

  if (nonInteractive) {
    return (
      <span className={merged} role="presentation">
        {children}
      </span>
    );
  }

  return (
    <button
      type={type}
      className={merged}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
