import type { RegistryRenderProps } from "../registry-types";
import { UiButton } from "@/components/ui";

export function ButtonNode({ node }: RegistryRenderProps) {
  if (node.type !== "Button") return null;
  return (
    <UiButton variant={node.variant ?? "primary"} nonInteractive>
      {node.label}
    </UiButton>
  );
}
