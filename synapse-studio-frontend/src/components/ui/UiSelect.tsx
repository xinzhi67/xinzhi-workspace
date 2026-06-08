import styles from "./UiSelect.module.css";

export type UiSelectOption = { value: string; label: string };

export type UiSelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  options: UiSelectOption[];
};

export function UiSelect({
  options,
  className,
  ...props
}: UiSelectProps) {
  return (
    <select
      className={[styles.select, className].filter(Boolean).join(" ")}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
