import styles from "./UiText.module.css";

export type UiTextVariant = "title" | "body" | "muted";

export function UiText({
  variant = "body",
  children,
  className,
  as: Tag = "p",
}: {
  variant?: UiTextVariant;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "h3";
}) {
  const cls =
    variant === "title"
      ? styles.textTitle
      : variant === "muted"
        ? styles.textMuted
        : styles.textBody;
  const merged = className ? `${cls} ${className}` : cls;
  return <Tag className={merged}>{children}</Tag>;
}
