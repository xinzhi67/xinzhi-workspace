import styles from "./UiSpinner.module.css";

export function UiSpinner({
  size = "md",
  className,
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={[
        styles.spinner,
        size === "sm" ? styles.spinnerSm : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}
