import type { ReactNode } from "react";
import styles from "./BadgeAnchor.module.css";
import { UiBadge } from "../Badge/Badge";

/** 气泡下小尾巴位置：`none` 关闭；默认左下，更贴常见「指向内容」习惯 */
export type UiBadgeAnchorArrow = "none" | "bottom-left" | "bottom-right";

export type UiBadgeAnchorProps = {
  children: ReactNode;
  /**
   * 右上角气泡内容：数字、短文案或任意节点（常与 {@link UiBadge} 搭配）。
   * 与 `dot` 同时存在时以 `bubble` 为准。
   */
  bubble?: ReactNode;
  /** 仅未读红点，类似消息列表外的小圆点 */
  dot?: boolean;
  /** 传入数字时自动格式化为角标（超过 `countMax` 显示为 `${countMax}+`） */
  count?: number;
  countMax?: number;
  /**
   * 气泡下方小箭头：`bottom-left` / `bottom-right` 指向锚点一侧；`none` 关闭。
   * 非红色自定义气泡建议 `none`，避免尾巴颜色不协调。
   */
  arrow?: UiBadgeAnchorArrow;
  className?: string;
  "aria-label"?: string;
};

function formatCount(n: number, max: number): string {
  if (n > max) return `${max}+`;
  return String(n);
}

/**
 * 将角标/气泡叠在任意锚点（按钮、图标、头像）**右上角**，与常见 IM 未读数样式一致。
 */
export function UiBadgeAnchor({
  children,
  bubble,
  dot,
  count,
  countMax = 99,
  arrow = "bottom-left",
  className,
  "aria-label": ariaLabel,
}: UiBadgeAnchorProps) {
  const fromCount =
    typeof count === "number" && count > 0 ? (
      <UiBadge tone="error" size="sm">
        {formatCount(count, countMax)}
      </UiBadge>
    ) : null;

  const resolvedBubble = bubble ?? fromCount;
  const showDot = Boolean(dot) && resolvedBubble == null;
  const showOverlay = showDot || resolvedBubble != null;

  const arrowCls =
    arrow === "none"
      ? styles.badgeAnchorArrowNone
      : arrow === "bottom-right"
        ? styles.badgeAnchorArrowBr
        : styles.badgeAnchorArrowBl;

  if (!showOverlay) {
    return <>{children}</>;
  }

  return (
    <span className={[styles.badgeAnchor, className].filter(Boolean).join(" ")} aria-label={ariaLabel}>
      {children}
      <span
        className={styles.badgeAnchorOverlay}
        aria-hidden={ariaLabel ? true : undefined}
      >
        <span
          data-bubble={showDot ? "dot" : "badge"}
          className={[styles.badgeAnchorBubble, showDot ? styles.badgeAnchorBubbleDot : "", arrowCls]
            .filter(Boolean)
            .join(" ")}
        >
          {showDot ? <span className={styles.badgeDot} /> : resolvedBubble}
        </span>
      </span>
    </span>
  );
}
