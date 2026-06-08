import type { RegistryRenderProps } from "../registry-types";
import { UiCard } from "@/components/ui";

export function CardNode({ node, renderNode }: RegistryRenderProps) {
  if (node.type !== "Card") return null;
  return (
    <UiCard title={node.title}>
      {node.children.map((child) => (
        <div key={child.id}>{renderNode(child)}</div>
      ))}
    </UiCard>
  );
}
