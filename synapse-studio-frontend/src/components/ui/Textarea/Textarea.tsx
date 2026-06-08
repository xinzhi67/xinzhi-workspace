import styles from "./Textarea.module.css";

export type UiTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function UiTextarea({ className, ...props }: UiTextareaProps) {
  return (
    <textarea
      className={[styles.textarea, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
