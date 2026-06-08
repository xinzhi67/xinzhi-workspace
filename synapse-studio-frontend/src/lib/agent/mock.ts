import type { AgentStreamEvent } from "./types";
import { parseDesignSpec } from "@/design-spec/schema";
import type { DesignSpec } from "@/design-spec/types";

let cachedExample: DesignSpec | null = null;

async function loadExampleSpec(): Promise<DesignSpec> {
  if (cachedExample) return cachedExample;
  const res = await fetch("/design-spec-example.json");
  if (!res.ok) throw new Error("无法加载示例 design spec");
  const json = await res.json();
  const parsed = parseDesignSpec(json);
  if (!parsed.success) throw new Error(String(parsed.error));
  cachedExample = parsed.data;
  return parsed.data;
}

/** 无后端时的本地模拟流（事件形状与真实 SSE 对齐） */
export async function startMockAgentStream(
  userText: string,
  onEvent: (e: AgentStreamEvent) => void,
  signal: AbortSignal,
) {
  const phases = ["planning", "layout", "tokens", "components"] as const;
  for (const phase of phases) {
    if (signal.aborted) return;
    onEvent({ type: "phase", phase });
    onEvent({ type: "log", message: `[mock] ${phase}：处理「${userText.slice(0, 40)}${userText.length > 40 ? "…" : ""}」` });
    await new Promise((r) => setTimeout(r, 380));
  }
  if (signal.aborted) return;
  const spec = await loadExampleSpec();
  const tailored: DesignSpec = {
    ...spec,
    meta: {
      title: "来自意图的占位预览",
      description: userText,
    },
  };
  onEvent({ type: "spec", spec: tailored });
  onEvent({ type: "done" });
}
