import styles from "./UiCheckbox.module.css";

export function UiCheckbox({
  label,
  id,
  ...props
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className={styles.checkRow}>
      <input id={id} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}
