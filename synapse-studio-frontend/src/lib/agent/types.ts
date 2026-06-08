import type { DesignSpec } from "@/design-spec/types";

export type AgentStreamEvent =
  | { type: "phase"; phase: string }
  | { type: "log"; message: string }
  | { type: "spec"; spec: DesignSpec }
  | { type: "done" }
  | { type: "error"; message: string };
