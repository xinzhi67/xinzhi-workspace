import styles from "./Breadcrumb.module.css";

export type UiBreadcrumbItem =
  | { label: string; href: string }
  | { label: string; current: true };

export function UiBreadcrumb({ items }: { items: UiBreadcrumbItem[] }) {
  return (
    <nav aria-label="面包屑">
      <ol className={styles.breadcrumb}>
        {items.map((item, i) => (
          <li key={i} className={styles.breadcrumbLi}>
            {i > 0 ? (
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
            ) : null}
            {"href" in item ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
