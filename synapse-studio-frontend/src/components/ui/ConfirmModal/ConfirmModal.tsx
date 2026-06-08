"use client";

import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmModal.module.css";

export type UiConfirmModalProps = {
  open: boolean;
  /** 标题 */
  title: ReactNode;
  /** 二级说明文案 */
  description?: ReactNode;
  /** 点击「确认」 */
  onConfirm: () => void;
  /** 关闭弹窗（点遮罩、Esc、点「取消」时由父级统一处理） */
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 是否展示「取消」；默认 false，纯确认只保留确认 */
  showCancel?: boolean;
  /** 顶部装饰弧线（SVG），默认不展示 */
  decorativeCurve?: boolean;
  className?: string;
};

export function UiConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onClose,
  confirmLabel = "确认",
  cancelLabel = "取消",
  showCancel = false,
  decorativeCurve = false,
  className,
}: UiConfirmModalProps) {
  const titleId = useId();
  const descId = useId();
  const curveGradId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const panelClass = [styles.confirmModalPanel, className].filter(Boolean).join(" ");

  return createPortal(
    <div className={styles.confirmModalRoot} role="presentation">
      <button
        type="button"
        className={styles.confirmModalBackdrop}
        aria-label="关闭"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={panelClass}
      >
        {decorativeCurve ? (
          <div className={styles.confirmModalCurve} aria-hidden>
            <svg viewBox="0 0 400 28" preserveAspectRatio="none" className={styles.confirmModalCurveSvg}>
              <defs>
                <linearGradient id={curveGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-neural)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--color-neural)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--color-neural)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M0,24 Q200,-4 400,24 L400,28 L0,28 Z"
                fill={`url(#${curveGradId})`}
                opacity="0.35"
              />
            </svg>
          </div>
        ) : null}
        <div className={styles.confirmModalBody}>
          <div id={titleId} className={styles.confirmModalTitle}>
            {title}
          </div>
          {description ? (
            <div id={descId} className={styles.confirmModalDesc}>
              {description}
            </div>
          ) : null}
        </div>
        <div className={styles.confirmModalFooter}>
          {showCancel ? (
            <button type="button" className={styles.confirmModalBtnCancel} onClick={onClose}>
              {cancelLabel}
            </button>
          ) : null}
          <button type="button" className={styles.confirmModalBtnConfirm} onClick={() => onConfirm()}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
