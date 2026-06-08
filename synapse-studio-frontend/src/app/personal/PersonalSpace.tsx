"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { UiButton } from "@/components/ui";
import {
  exportProfileJson,
  getUserProfileServerSnapshot,
  getUserProfileSnapshot,
  importProfileJson,
  saveUserProfile,
  subscribeUserProfile,
  type UserProfile,
} from "@/lib/personal/profile";
import section from "../page-section.module.css";
import styles from "./personal.module.css";

export function PersonalSpace() {
  const profile = useSyncExternalStore(
    subscribeUserProfile,
    getUserProfileSnapshot,
    getUserProfileServerSnapshot,
  );
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const persist = useCallback((next: UserProfile) => {
    saveUserProfile(next);
    setMessage("已保存到本地");
    setTimeout(() => setMessage(null), 2000);
  }, []);

  const onExport = () => {
    const blob = new Blob([exportProfileJson(profile)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "synapse-profile.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("已导出 JSON");
    setTimeout(() => setMessage(null), 2000);
  };

  const onImport = () => {
    try {
      const next = importProfileJson(importText);
      saveUserProfile(next);
      setImportText("");
      setMessage("导入成功");
      setTimeout(() => setMessage(null), 2000);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "导入失败");
    }
  };

  return (
    <>
      <h1 className={section.title}>个人空间</h1>
      <p className={section.subtitle}>
        资料仅存于本机浏览器（localStorage）。可通过 JSON
        导出/导入迁移；后续可对接后端账号。
      </p>
      {message ? <p className={styles.toast}>{message}</p> : null}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>基本资料</h2>
          <label className={styles.field}>
            <span>显示名称</span>
            <input
              className={styles.input}
              value={profile.displayName}
              onChange={(e) =>
                persist({ ...profile, displayName: e.target.value })
              }
            />
          </label>
          <label className={styles.field}>
            <span>简介</span>
            <textarea
              className={styles.textarea}
              value={profile.bio ?? ""}
              onChange={(e) => persist({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </label>
          <label className={styles.field}>
            <span>语言</span>
            <select
              className={styles.input}
              value={profile.locale ?? "zh-CN"}
              onChange={(e) =>
                persist({
                  ...profile,
                  locale: e.target.value as UserProfile["locale"],
                })
              }
            >
              <option value="zh-CN">简体中文</option>
              <option value="en">English</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>强调色偏好</span>
            <select
              className={styles.input}
              value={profile.accentColor ?? "neural"}
              onChange={(e) =>
                persist({
                  ...profile,
                  accentColor: e.target.value as UserProfile["accentColor"],
                })
              }
            >
              <option value="neural">主橙色</option>
              <option value="data">琥珀点缀</option>
              <option value="space">深色底</option>
            </select>
          </label>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>导入 / 导出</h2>
          <p className={styles.hint}>
            将下方 JSON 粘贴到另一台设备或备份文件中，再使用「导入」恢复。
          </p>
          <UiButton variant="secondary" onClick={onExport}>
            导出 profile.json
          </UiButton>
          <textarea
            className={styles.textarea}
            placeholder="粘贴从别处导出的 JSON…"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={8}
          />
          <UiButton onClick={onImport}>导入并校验</UiButton>
        </div>
      </div>
    </>
  );
}
