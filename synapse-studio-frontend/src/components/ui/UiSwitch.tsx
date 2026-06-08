import styles from "./UiSwitch.module.css";

export function UiSwitch({
  checked,
  onCheckedChange,
  id,
  disabled,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  id?: string;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      disabled={disabled}
      className={[styles.switch, checked ? styles.switchOn : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={() => !disabled && onCheckedChange(!checked)}
    >
      <span
        className={[styles.switchThumb, checked ? styles.switchThumbOn : ""]
          .filter(Boolean)
          .join(" ")}
      />
    </button>
  );
}
