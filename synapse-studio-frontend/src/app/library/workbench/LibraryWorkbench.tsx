"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DOCS } from "./docMap";
import { LIBRARY_MENU, parseLibraryId } from "./menu";
import type { LibraryItemId } from "./types";
import styles from "../library.module.css";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeToolbar}>
        <span className={styles.codeToolbarLabel}>示例代码</span>
        <button type="button" className={styles.codeCopyBtn} onClick={() => void copy()}>
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre className={styles.codePre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function LibraryWorkbenchInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);

  const activeId = parseLibraryId(searchParams.get("c") ?? undefined);

  const select = (id: LibraryItemId) => {
    router.replace(`${pathname}?c=${id}`, { scroll: false });
  };

  const doc = DOCS[activeId];
  const Demo = doc.Demo;

  return (
    <div className={styles.workbench}>
      <aside
        className={`${styles.wbAside} ${collapsed ? styles.wbAsideCollapsed : ""}`}
      >
        <div className={styles.wbAsideHeader}>
          <button
            type="button"
            className={styles.wbCollapseBtn}
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
            title={collapsed ? "展开菜单" : "收起菜单"}
          >
            {collapsed ? "»" : "«"}
          </button>
          {!collapsed ? <span className={styles.wbAsideTitle}>组件</span> : null}
        </div>
        <nav className={styles.wbNav} aria-label="组件库菜单">
          {LIBRARY_MENU.map((group) => (
            <div key={group.id} className={styles.wbNavGroup}>
              {!collapsed ? (
                <div className={styles.wbNavGroupLabel}>{group.label}</div>
              ) : null}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  title={collapsed ? item.label : undefined}
                  className={`${styles.wbNavItem} ${activeId === item.id ? styles.wbNavItemActive : ""}`}
                  onClick={() => select(item.id)}
                >
                  {collapsed ? item.id.slice(0, 2) : item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className={styles.wbMain}>
        <header className={styles.wbMainHeader}>
          <h2 className={styles.wbMainTitle}>{doc.title}</h2>
          <p className={styles.wbMainDesc}>{doc.description}</p>
        </header>

        <section className={styles.wbSection}>
          <h3 className={styles.wbSectionTitle}>组合交互演示</h3>
          <p className={styles.wbSectionHint}>
            以下为真实联动场景：多数条目用布局、状态与内联文案表达结果；打断式纯确认请用{" "}
            <code>UiConfirmModal</code>
            （<code>?c=confirm-modal</code>），页内轻提示用 <code>UiAlert</code> 条带。
          </p>
          <div className={styles.wbPlayground}>
            <Demo key={activeId} />
          </div>
        </section>

        <section className={styles.wbSection}>
          <CodeBlock code={doc.snippet} />
        </section>
      </main>
    </div>
  );
}

export function LibraryWorkbench() {
  return (
    <Suspense
      fallback={
        <div className={styles.workbenchFallback}>加载组件工作台…</div>
      }
    >
      <LibraryWorkbenchInner />
    </Suspense>
  );
}
