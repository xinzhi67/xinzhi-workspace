import type { ComponentType } from "react";
import type { DesignNode } from "@/design-spec/types";
import type { RegistryRenderProps } from "./registry-types";
import { StackNode } from "./primitives/StackNode";
import { TextNode } from "./primitives/TextNode";
import { ButtonNode } from "./primitives/ButtonNode";
import { CardNode } from "./primitives/CardNode";

export type { RegistryRenderProps } from "./registry-types";

export const registry: Record<
  DesignNode["type"],
  ComponentType<RegistryRenderProps>
> = {
  Stack: StackNode,
  Text: TextNode,
  Button: ButtonNode,
  Card: CardNode,
};
