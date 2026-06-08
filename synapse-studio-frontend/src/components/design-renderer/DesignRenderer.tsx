import type { ReactNode } from "react";
import type { DesignNode } from "@/design-spec/types";
import { registry } from "@/components/registry/registry";

function renderNode(node: DesignNode): ReactNode {
  const Cmp = registry[node.type];
  if (!Cmp) {
    return (
      <div
        style={{
          padding: "0.75rem",
          borderRadius: "var(--radius-sm)",
          background: "rgba(255, 143, 81, 0.14)",
          color: "var(--color-neural)",
          fontSize: "0.85rem",
        }}
      >
        未知节点类型：{(node as { type?: string }).type ?? "?"}
      </div>
    );
  }
  return <Cmp node={node} renderNode={renderNode} />;
}

export function DesignRenderer({ node }: { node: DesignNode }) {
  return renderNode(node);
}
