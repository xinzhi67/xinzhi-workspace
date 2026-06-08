import styles from "./Link.module.css";

export type UiLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function UiLink({ className, children, ...props }: UiLinkProps) {
  return (
    <a
      className={[styles.link, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}
