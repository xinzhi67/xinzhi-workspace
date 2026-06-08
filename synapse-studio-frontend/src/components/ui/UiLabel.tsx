import styles from "./UiLabel.module.css";

export function UiLabel({
  htmlFor,
  children,
  className,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={[styles.label, className].filter(Boolean).join(" ")}
    >
      {children}
    </label>
  );
}
