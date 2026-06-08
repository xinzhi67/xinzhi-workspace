"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { animateMainEnter } from "@/lib/motion/presets";
import { SynapseLogo } from "./SynapseLogo";
import styles from "./workspace-shell.module.css";

const NAV = [
  { href: "/", label: "工作台" },
  { href: "/personal", label: "个人空间" },
  { href: "/design", label: "UI 设计稿" },
  { href: "/play", label: "娱乐空间" },
  { href: "/library", label: "组件库" },
  { href: "/test", label: "测试空间" },
] as const;

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    animateMainEnter(mainRef.current);
  }, [pathname]);

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <SynapseLogo size={44} />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Synapse Studio</span>
            <span className={styles.brandSubtitle}>灵感枢纽</span>
            <span className={styles.tagline}>
              Where ideas connect and create
            </span>
          </div>
        </div>
        <nav className={styles.nav} aria-label="主导航">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p
          style={{
            marginTop: "auto",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.5,
          }}
        >
          创意在此连接与创造
        </p>
      </aside>
      <main ref={mainRef} className={styles.main}>
        <div className={styles.mainInner}>{children}</div>
      </main>
    </div>
  );
}
