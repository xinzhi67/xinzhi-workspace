import styles from "./Avatar.module.css";

export function UiAvatar({
  label,
  src,
  alt = "",
  className,
}: {
  /** 无图片时显示的首字母或短文本 */
  label: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  const initials = label.trim().slice(0, 2).toUpperCase();
  return (
    <div
      className={[styles.avatar, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      {src ? (
        // 基础 UI：调用方传入任意 URL，不使用 next/image 以免约束域名与尺寸
        // eslint-disable-next-line @next/next/no-img-element -- primitive UiAvatar
        <img className={styles.avatarImg} src={src} alt={alt || label} />
      ) : (
        initials
      )}
    </div>
  );
}
