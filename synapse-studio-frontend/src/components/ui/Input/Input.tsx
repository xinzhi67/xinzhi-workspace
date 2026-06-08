import styles from "./Input.module.css";

export type UiInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

export function UiInput({ className, ...props }: UiInputProps) {
  return (
    <input
      className={[styles.input, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
