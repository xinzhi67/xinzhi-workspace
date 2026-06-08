"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DesignRenderer } from "@/components/design-renderer/DesignRenderer";
import { parseDesignSpec } from "@/design-spec/schema";
import type { DesignSpec } from "@/design-spec/types";
import {
  createSession,
  getAgentApiBase,
  sendUserMessage,
  subscribeAgentStream,
} from "@/lib/agent/client";
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
          ? `会话已创建：${id}`
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
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>AI 创意工坊</h1>
          <span className={styles.status}>
            {busy ? "生成中..." : "就绪"}
          </span>
        </div>
      </div>

      {/* Project Cards */}
      <div className={styles.projects}>
        <div className={styles.projectRow}>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>UI 设计稿生成</p>
                <p className={styles.projectDesc}>输入意图，自动生成设计 Spec</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>就绪</span>
              <span className={styles.projectAction}>开始 →</span>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>智能对话助手</p>
                <p className={styles.projectDesc}>自然语言交互与问答</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>规划中</span>
              <span className={styles.projectAction}>查看 →</span>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>AI 音乐创作</p>
                <p className={styles.projectDesc}>根据描述生成背景配乐</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>规划中</span>
              <span className={styles.projectAction}>查看 →</span>
            </div>
          </div>
        </div>
        <div className={styles.projectRow}>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>文案生成器</p>
                <p className={styles.projectDesc}>批量生成产品文案与描述</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>规划中</span>
              <span className={styles.projectAction}>查看 →</span>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>风格迁移</p>
                <p className={styles.projectDesc}>将设计稿转换为不同风格</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>规划中</span>
              <span className={styles.projectAction}>查看 →</span>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.projectTop}>
              <div className={styles.projectIcon} />
              <div>
                <p className={styles.projectName}>智能检索</p>
                <p className={styles.projectDesc}>语义搜索组件与设计稿</p>
              </div>
            </div>
            <div className={styles.projectBottom}>
              <span className={styles.projectStatus}>规划中</span>
              <span className={styles.projectAction}>查看 →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Bar */}
      <div className={styles.promptBar}>
        <div className={styles.promptLeft}>
          <span className={styles.plusIcon}>+</span>
          <input
            className={styles.promptInput}
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="描述你想要的界面..."
            onKeyDown={(e) => {
              if (e.key === "Enter") void run();
            }}
          />
        </div>
        <button
          className={styles.sendBtn}
          onClick={() => void run()}
          disabled={busy}
          aria-label="生成设计稿"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      {/* Log & Preview (collapsible) */}
      {spec ? (
        <div className={styles.resultArea}>
          <div className={styles.resultTabs}>
            <button
              className={`${styles.resultTab} ${tab === "preview" ? styles.resultTabActive : ""}`}
              onClick={() => setTab("preview")}
            >
              预览
            </button>
            <button
              className={`${styles.resultTab} ${tab === "json" ? styles.resultTabActive : ""}`}
              onClick={() => setTab("json")}
            >
              JSON
            </button>
          </div>
          {tab === "preview" ? (
            <div className={styles.previewWrap}>
              <DesignRenderer node={spec.root} />
            </div>
          ) : (
            <div>
              <textarea
                className={styles.jsonArea}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
              />
              <button className={styles.applyBtn} onClick={applyJson}>
                校验并应用
              </button>
            </div>
          )}
        </div>
      ) : null}

      {log ? (
        <details className={styles.logDetails}>
          <summary className={styles.logSummary}>日志</summary>
          <pre className={styles.logPre}>{log}</pre>
        </details>
      ) : null}
    </div>
  );
}
