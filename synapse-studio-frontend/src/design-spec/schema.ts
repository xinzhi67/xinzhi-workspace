import { z } from "zod";
import type { DesignNode } from "./types";
import { DESIGN_SPEC_VERSION } from "./types";

export const designNodeSchema: z.ZodType<DesignNode> = z.lazy(() =>
  z.union([
    z.object({
      id: z.string(),
      type: z.literal("Stack"),
      direction: z.enum(["row", "column"]),
      gap: z.number().optional(),
      children: z.array(designNodeSchema),
    }),
    z.object({
      id: z.string(),
      type: z.literal("Text"),
      content: z.string(),
      variant: z.enum(["title", "body", "muted"]).optional(),
    }),
    z.object({
      id: z.string(),
      type: z.literal("Button"),
      label: z.string(),
      variant: z.enum(["primary", "secondary", "ghost"]).optional(),
    }),
    z.object({
      id: z.string(),
      type: z.literal("Card"),
      title: z.string().optional(),
      children: z.array(designNodeSchema),
    }),
  ]),
);

export const designSpecSchema = z.object({
  designSpecVersion: z.literal(DESIGN_SPEC_VERSION),
  meta: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  tokens: z
    .object({
      accent: z.string().optional(),
      muted: z.string().optional(),
    })
    .optional(),
  root: designNodeSchema,
});

export type DesignSpecParsed = z.infer<typeof designSpecSchema>;

export function parseDesignSpec(data: unknown) {
  return designSpecSchema.safeParse(data);
}
