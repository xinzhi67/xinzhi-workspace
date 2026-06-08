import styles from "./Alert.module.css";
import type { ReactNode } from "react";

export type UiAlertTone = "info" | "success" | "warning" | "error";

/** 页内提示条；打断式确认请使用 {@link UiConfirmModal} */
export function UiAlert({
  tone = "info",
  children,
  className,
}: {
  tone?: UiAlertTone;
  children: ReactNode;
  className?: string;
}) {
  const toneCls =
    tone === "success"
      ? styles.alertSuccess
      : tone === "warning"
        ? styles.alertWarning
        : tone === "error"
          ? styles.alertError
          : styles.alertInfo;
  return (
    <div
      role="status"
      className={[styles.alert, toneCls, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
