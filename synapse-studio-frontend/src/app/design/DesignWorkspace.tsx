"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DesignRenderer } from "@/components/design-renderer/DesignRenderer";
import { parseDesignSpec } from "@/design-spec/schema";
import type { DesignSpec } from "@/design-spec/types";
import { UiButton } from "@/components/ui";
import {
  createSession,
  getAgentApiBase,
  sendUserMessage,
  subscribeAgentStream,
} from "@/lib/agent/client";
import section from "../page-section.module.css";
import styles from "./design-workspace.module.css";

type Tab = "preview" | "json";

export function DesignWorkspace() {
  const [intent, setIntent] = useState(
    "做一个橙色暖色主题的仪表盘卡片区域",
  );
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState("");
  const [phases, setPhases] = useState<string[]>([]);
  const [spec, setSpec] = useState<DesignSpec | null>(null);
  const [tab, setTab] = useState<Tab>("preview");
  const [jsonText, setJsonText] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const closeStreamRef = useRef<{ close: () => void } | null>(null);

  const apiBase = useMemo(() => getAgentApiBase(), []);

  const appendLog = useCallback((line: string) => {
    setLog((prev) => (prev ? `${prev}\n${line}` : line));
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      closeStreamRef.current?.close();
    };
  }, []);

  const run = async () => {
    const text = intent.trim();
    if (!text || busy) return;
    setBusy(true);
    setPhases([]);
    setLog("");
    abortRef.current?.abort();
    closeStreamRef.current?.close();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const { id } = await createSession();
      appendLog(
        apiBase
          ? `会话已创建：${id}，连接 ${apiBase}/sessions/.../stream`
          : `本地模式：会话 ${id}（未配置 NEXT_PUBLIC_AGENT_API_BASE）`,
      );
      if (apiBase) {
        await sendUserMessage(id, text);
      }
      closeStreamRef.current = subscribeAgentStream(
        id,
        text,
        (ev) => {
          if (ev.type === "phase") {
            setPhases((p) => [...p, ev.phase]);
            appendLog(`阶段：${ev.phase}`);
          } else if (ev.type === "log") {
            appendLog(ev.message);
          } else if (ev.type === "spec") {
            setSpec(ev.spec);
            setJsonText(JSON.stringify(ev.spec, null, 2));
            appendLog("已收到 design spec");
          } else if (ev.type === "error") {
            appendLog(`错误：${ev.message}`);
            setBusy(false);
          } else if (ev.type === "done") {
            appendLog("完成");
            setBusy(false);
          }
        },
        { signal: ac.signal },
      );
    } catch (e) {
      appendLog(e instanceof Error ? e.message : "未知错误");
      setBusy(false);
    }
  };

  const applyJson = () => {
    try {
      const data = JSON.parse(jsonText) as unknown;
      const parsed = parseDesignSpec(data);
      if (!parsed.success) {
        appendLog(`JSON 校验失败：${String(parsed.error)}`);
        return;
      }
      setSpec(parsed.data);
      appendLog("已从编辑器应用 JSON");
    } catch (e) {
      appendLog(e instanceof Error ? e.message : "JSON 解析失败");
    }
  };

  return (
    <>
      <h1 className={section.title}>UI 设计稿生成</h1>
      <p className={section.subtitle}>
        输入一句话意图；右侧为 Design Spec 预览与 JSON。已配置后端基址时将使用
        SSE 与重连策略；未配置时走本地 mock 流，事件形状与后端一致便于联调。
      </p>
      <div className={styles.layout}>
        <div className={styles.panel}>
          <span className={styles.label}>意图</span>
          <textarea
            className={styles.textarea}
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="描述你想要的界面…"
          />
          <UiButton disabled={busy} onClick={() => void run()}>
            {busy ? "生成中…" : "生成设计稿"}
          </UiButton>
          <div>
            <span className={styles.label}>阶段</span>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              {phases.length ? phases.join(" → ") : "—"}
            </p>
          </div>
          <div>
            <span className={styles.label}>日志</span>
            <pre className={styles.log}>{log || "—"}</pre>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${tab === "preview" ? styles.tabActive : ""}`}
              onClick={() => setTab("preview")}
            >
              预览
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === "json" ? styles.tabActive : ""}`}
              onClick={() => setTab("json")}
            >
              JSON
            </button>
          </div>
          {tab === "preview" ? (
            <div className={styles.previewWrap}>
              {spec ? (
                <DesignRenderer node={spec.root} />
              ) : (
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                  尚无 spec。点击「生成设计稿」或切换到 JSON 粘贴后应用。
                </p>
              )}
            </div>
          ) : (
            <>
              <textarea
                className={styles.jsonArea}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
              />
              <UiButton onClick={applyJson}>校验并应用到预览</UiButton>
            </>
          )}
        </div>
      </div>
    </>
  );
}
