"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { animateMainEnter } from "@/lib/motion/presets";
import { SynapseLogo } from "./SynapseLogo";
import styles from "./workspace-shell.module.css";

const NAV = [
  { href: "/", label: "工作台" },
  { href: "/design", label: "设计稿" },
  { href: "/play", label: "娱乐空间" },
  { href: "/library", label: "组件库" },
  { href: "/personal", label: "个人空间" },
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
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <Link href="/" className={styles.logoArea}>
            <span className={styles.logoIcon}>
              <SynapseLogo size={28} />
            </span>
            <span className={styles.brandTitle}>Synapse Studio</span>
          </Link>
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
        </div>
        <div className={styles.topRight}>
          <span className={styles.avatar}>X</span>
        </div>
      </header>
      <main ref={mainRef} className={styles.main}>
        {children}
      </main>
    </div>
  );
}
