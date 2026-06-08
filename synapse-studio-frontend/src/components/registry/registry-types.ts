import type { ReactNode } from "react";
import type { DesignNode } from "@/design-spec/types";

export type RegistryRenderProps = {
  node: DesignNode;
  renderNode: (n: DesignNode) => ReactNode;
};
