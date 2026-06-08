"use client";

import { useState, type ReactNode } from "react";
import styles from "./UiTabs.module.css";

export type UiTabItem = {
  id: string;
  label: string;
  panel: ReactNode;
};

export function UiTabs({
  items,
  defaultId,
  className,
}: {
  items: UiTabItem[];
  defaultId?: string;
  className?: string;
}) {
  const first = items[0]?.id ?? "";
  const [active, setActive] = useState(defaultId ?? first);

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(" ")}>
      <div className={styles.tabList} role="tablist">
        {items.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={[
              styles.tabBtn,
              active === t.id ? styles.tabBtnActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t) =>
        active === t.id ? (
          <div
            key={t.id}
            role="tabpanel"
            className={styles.tabPanel}
            id={`panel-${t.id}`}
          >
            {t.panel}
          </div>
        ) : null,
      )}
    </div>
  );
}
