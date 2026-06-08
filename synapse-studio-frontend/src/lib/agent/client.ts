import { parseDesignSpec } from "@/design-spec/schema";
import type { DesignSpec } from "@/design-spec/types";
import type { AgentStreamEvent } from "./types";
import { startMockAgentStream } from "./mock";

export function getAgentApiBase(): string {
  return (process.env.NEXT_PUBLIC_AGENT_API_BASE ?? "").replace(/\/$/, "");
}

export async function createSession(): Promise<{ id: string }> {
  const base = getAgentApiBase();
  if (!base) {
    return { id: `local-${crypto.randomUUID()}` };
  }
  const res = await fetch(`${base}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) throw new Error(`创建会话失败：${res.status}`);
  return res.json() as Promise<{ id: string }>;
}

export async function sendUserMessage(sessionId: string, text: string) {
  const base = getAgentApiBase();
  if (!base) return;
  const res = await fetch(`${base}/sessions/${sessionId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`发送消息失败：${res.status}`);
}

function parseSseData(data: string): AgentStreamEvent | null {
  try {
    const raw = JSON.parse(data) as Record<string, unknown>;
    if (raw.type === "phase" && typeof raw.phase === "string") {
      return { type: "phase", phase: raw.phase };
    }
    if (raw.type === "log" && typeof raw.message === "string") {
      return { type: "log", message: raw.message };
    }
    if (raw.type === "spec") {
      const payload =
        "spec" in raw && raw.spec !== undefined ? raw.spec : raw;
      const parsed = parseDesignSpec(payload);
      if (parsed.success) {
        return { type: "spec", spec: parsed.data };
      }
      return { type: "error", message: String(parsed.error) };
    }
    if (raw.type === "done") return { type: "done" };
    if (raw.type === "error" && typeof raw.message === "string") {
      return { type: "error", message: raw.message };
    }
  } catch {
    return { type: "error", message: "无法解析 SSE 数据" };
  }
  return null;
}

async function fetchSessionState(
  base: string,
  sessionId: string,
): Promise<DesignSpec | null> {
  try {
    const res = await fetch(`${base}/sessions/${sessionId}/state`);
    if (!res.ok) return null;
    const body = await res.json();
    const specPayload = body.spec ?? body;
    const parsed = parseDesignSpec(specPayload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/**
 * 订阅智能体事件流。无 NEXT_PUBLIC_AGENT_API_BASE 时使用本地 mock。
 * 真实后端：EventSource GET /sessions/:id/stream；断线指数退避重连，并尝试拉取 state 快照。
 */
export function subscribeAgentStream(
  sessionId: string,
  userText: string,
  onEvent: (e: AgentStreamEvent) => void,
  options: { signal: AbortSignal },
): { close: () => void } {
  const base = getAgentApiBase();
  const { signal } = options;

  if (!base) {
    let closed = false;
    void (async () => {
      try {
        await startMockAgentStream(userText, onEvent, signal);
      } catch (e) {
        if (!closed && !signal.aborted) {
          onEvent({
            type: "error",
            message: e instanceof Error ? e.message : "mock 流失败",
          });
        }
      }
    })();
    return {
      close() {
        closed = true;
      },
    };
  }

  let es: EventSource | null = null;
  let attempt = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let closed = false;

  const cleanupEs = () => {
    if (es) {
      es.close();
      es = null;
    }
  };

  const open = () => {
    if (closed || signal.aborted) return;
    cleanupEs();
    const url = `${base}/sessions/${encodeURIComponent(sessionId)}/stream`;
    es = new EventSource(url, { withCredentials: true });

    es.onmessage = (ev) => {
      attempt = 0;
      const evt = parseSseData(ev.data);
      if (evt) onEvent(evt);
    };

    es.onerror = () => {
      cleanupEs();
      if (closed || signal.aborted) return;
      attempt += 1;
      const delay = Math.min(30_000, 800 * 2 ** Math.min(attempt, 6));
      onEvent({
        type: "log",
        message: `[连接] 第 ${attempt} 次重连，${Math.round(delay / 1000)}s 后重试…`,
      });
      timer = setTimeout(async () => {
        const snap = await fetchSessionState(base, sessionId);
        if (snap) onEvent({ type: "spec", spec: snap });
        open();
      }, delay);
    };
  };

  open();

  return {
    close() {
      closed = true;
      if (timer) clearTimeout(timer);
      cleanupEs();
    },
  };
}
