import styles from "./RadioGroup.module.css";

export type UiRadioOption = { value: string; label: string };

export function UiRadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: {
  name: string;
  legend: string;
  options: UiRadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <fieldset
      className={[styles.fieldset, className].filter(Boolean).join(" ")}
    >
      <legend className={styles.legend}>{legend}</legend>
      {options.map((o) => {
        const id = `${name}-${o.value}`;
        return (
          <label key={o.value} htmlFor={id} className={styles.radioRow}>
            <input
              id={id}
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
