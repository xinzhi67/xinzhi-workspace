import type { RegistryRenderProps } from "../registry-types";
import { UiText } from "@/components/ui";

export function TextNode({ node }: RegistryRenderProps) {
  if (node.type !== "Text") return null;
  return (
    <UiText variant={node.variant ?? "body"}>{node.content}</UiText>
  );
}
