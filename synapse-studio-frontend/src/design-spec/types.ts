export const DESIGN_SPEC_VERSION = 1 as const;
export type DesignSpecVersion = typeof DESIGN_SPEC_VERSION;

export type DesignNode =
  | {
      id: string;
      type: "Stack";
      direction: "row" | "column";
      gap?: number;
      children: DesignNode[];
    }
  | {
      id: string;
      type: "Text";
      content: string;
      variant?: "title" | "body" | "muted";
    }
  | {
      id: string;
      type: "Button";
      label: string;
      variant?: "primary" | "secondary" | "ghost";
    }
  | {
      id: string;
      type: "Card";
      title?: string;
      children: DesignNode[];
    };

export type DesignSpec = {
  designSpecVersion: DesignSpecVersion;
  meta?: { title?: string; description?: string };
  tokens?: { accent?: string; muted?: string };
  root: DesignNode;
};
