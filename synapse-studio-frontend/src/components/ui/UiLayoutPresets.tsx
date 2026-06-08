import type { ReactNode } from "react";
import { UiContainer } from "./UiContainer";
import { UiDivider } from "./UiDivider";
import { UiStack } from "./UiStack";
import styles from "./UiLayoutPresets.module.css";

export type UiLayoutShellVariant = "hcf" | "sider-start" | "sider-end" | "sider-rail";

type UiLayoutShellBase = {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
  className?: string;
  /**
   * 有侧栏的 variant 下生效：收窄网格中的侧栏列，配合槽内折叠导航使用。
   * `hcf` 无侧栏时传值无效果。
   */
  siderCollapsed?: boolean;
};

export type UiLayoutShellProps =
  | (UiLayoutShellBase & { variant: "hcf" })
  | (UiLayoutShellBase & { variant: "sider-start" | "sider-end" | "sider-rail"; sider: ReactNode });

/**
 * 经典页面壳：Header / Content / Footer，及可选 Sider 区。
 * - `hcf`：上中下三栏
 * - `sider-start`：顶底通栏 + 中部「左 Sider | 右 Content」
 * - `sider-end`：顶底通栏 + 中部「左 Content | 右 Sider」
 * - `sider-rail`：左侧通高 Sider，右侧为 Header + Content + Footer
 */
export function UiLayoutShell(props: UiLayoutShellProps) {
  const { header, content, footer, className, siderCollapsed } = props;
  const variant = props.variant;
  const variantCls =
    variant === "hcf"
      ? styles.layoutShellHcf
      : variant === "sider-start"
        ? styles.layoutShellSiderStart
        : variant === "sider-end"
          ? styles.layoutShellSiderEnd
          : styles.layoutShellSiderRail;

  const sider = variant === "hcf" ? null : props.sider;
  const narrowSider =
    Boolean(siderCollapsed) && variant !== "hcf" ? styles.layoutShellSiderCollapsed : "";

  return (
    <div
      className={[styles.layoutShell, variantCls, narrowSider, className].filter(Boolean).join(" ")}
    >
      {variant === "sider-rail" ? (
        <>
          <aside className={styles.layoutShellSide}>{sider}</aside>
          <header className={styles.layoutShellHdr}>{header}</header>
          <main className={styles.layoutShellMain}>{content}</main>
          <footer className={styles.layoutShellFtr}>{footer}</footer>
        </>
      ) : (
        <>
          <header className={styles.layoutShellHdr}>{header}</header>
          {variant !== "hcf" ? <aside className={styles.layoutShellSide}>{sider}</aside> : null}
          <main className={styles.layoutShellMain}>{content}</main>
          <footer className={styles.layoutShellFtr}>{footer}</footer>
        </>
      )}
    </div>
  );
}

/** 页面主栏：最大宽度 + 水平内边距 + 纵向节奏（基于 UiContainer） */
export function UiLayoutPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <UiContainer className={className}>
      <div className={styles.layoutPageInner}>{children}</div>
    </UiContainer>
  );
}

/** 侧栏 + 主区（窄屏单列堆叠） */
export function UiLayoutSplit({
  sidebar,
  children,
  className,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.layoutSplit, className].filter(Boolean).join(" ")}>
      <aside className={styles.layoutSplitAside}>{sidebar}</aside>
      <main className={styles.layoutSplitMain}>{children}</main>
    </div>
  );
}

/** 顶栏 + 可滚动正文（工作台 / 设置页常见骨架） */
export function UiLayoutHeaderBody({
  header,
  children,
  className,
}: {
  header: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.layoutChrome, className].filter(Boolean).join(" ")}>
      <header className={styles.layoutChromeHeader}>{header}</header>
      <div className={styles.layoutChromeBody}>{children}</div>
    </div>
  );
}

export type UiLayoutAutoGridProps = {
  children: ReactNode;
  /** minmax 最小列宽，如 9rem、140px */
  minColumn?: string;
  gap?: number;
  className?: string;
};

/** 自适应卡片栅格：repeat(auto-fill, minmax(...)) */
export function UiLayoutAutoGrid({
  children,
  minColumn = "9rem",
  gap = 10,
  className,
}: UiLayoutAutoGridProps) {
  return (
    <div
      className={[styles.layoutAutoGrid, className].filter(Boolean).join(" ")}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumn}, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}

/** 工具条 / 操作按钮一行（可换行） */
export function UiLayoutActionRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={[styles.layoutActionRow, className].filter(Boolean).join(" ")}>{children}</div>;
}

/** 表单字段纵向堆叠（统一间距） */
export function UiLayoutFormFields({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <UiStack direction="column" gap={12} className={className}>
      {children}
    </UiStack>
  );
}

/** 设置项分组：小标题 + 内容 + 尾部分割线 */
export function UiLayoutSettingsBlock({
  title,
  children,
  withDivider = true,
}: {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
}) {
  return (
    <section className={styles.layoutSettingsBlock}>
      <div className={styles.layoutSettingsTitle}>{title}</div>
      <div className={styles.layoutSettingsBody}>{children}</div>
      {withDivider ? <UiDivider /> : null}
    </section>
  );
}
