import type { DesignSpec } from "./types";
import { DESIGN_SPEC_VERSION } from "./types";

/** 预留：后端旧版本 spec 升级入口 */
export function migrateDesignSpec(raw: unknown): DesignSpec | null {
  if (
    raw &&
    typeof raw === "object" &&
    "designSpecVersion" in raw &&
    (raw as { designSpecVersion: number }).designSpecVersion ===
      DESIGN_SPEC_VERSION &&
    "root" in raw
  ) {
    return raw as DesignSpec;
  }
  return null;
}
