import styles from "./UiBadge.module.css";

export type UiBadgeTone = "default" | "success" | "warning" | "error";

export type UiBadgeSize = "md" | "sm";

export function UiBadge({
  children,
  tone = "default",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  tone?: UiBadgeTone;
  /** sm：右上角角标、纯数字等紧凑场景 */
  size?: UiBadgeSize;
  className?: string;
}) {
  const toneCls =
    tone === "success"
      ? styles.badgeSuccess
      : tone === "warning"
        ? styles.badgeWarning
        : tone === "error"
          ? styles.badgeError
          : styles.badgeDefault;
  const sizeCls = size === "sm" ? styles.badgeSm : "";
  return (
    <span
      data-tone={tone}
      className={[styles.badge, toneCls, sizeCls, className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}
