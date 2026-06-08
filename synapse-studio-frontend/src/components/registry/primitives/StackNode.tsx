import type { RegistryRenderProps } from "../registry-types";
import { UiStack } from "@/components/ui";

export function StackNode({ node, renderNode }: RegistryRenderProps) {
  if (node.type !== "Stack") return null;
  return (
    <UiStack direction={node.direction} gap={node.gap ?? 8}>
      {node.children.map((child) => (
        <div key={child.id}>{renderNode(child)}</div>
      ))}
    </UiStack>
  );
}
