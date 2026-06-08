/**
 * 后端 API 端点注册表
 *
 * 新增接口只需：
 * 1. 在下方 `api` 对象中加一行（如 `myNewApi: () => apiGet<SomeType>('/some/path')`）
 * 2. 如需类型，在上方类型区定义 interface
 * 3. 后端实现对应的 NestJS controller 即可
 */

import { apiGet, apiPost } from "./client";

// ============================================================
// 类型定义
// ============================================================

/** GET /api/v1/test/hello */
export interface TestHelloResponse {
  message: string;
}

/** GET /api/v1/test/db */
export interface TestDbResponse {
  ok: boolean;
  database: string;
  ping: Array<{ ok: number }>;
  designGenerationsTablePresent: boolean;
}

/** POST /api/v1/design/generate 请求 */
export interface DesignGenerateRequest {
  prompt: string;
  appId?: string;
}

/** POST /api/v1/design/generate 响应 */
export interface DesignGenerateResponse {
  title: string;
  description: string;
  components: Array<{ type: string; props: Record<string, unknown> }>;
  metadata?: Record<string, unknown>;
}

/** POST /api/v1/intent/recognize 请求 */
export interface IntentRecognizeRequest {
  text: string;
}

/** POST /api/v1/intent/recognize 响应 */
export interface IntentRecognizeResponse {
  intent: string;
  confidence: number;
  entities?: Record<string, unknown>;
  assistantHint?: string;
}

// ============================================================
// API 函数 —— 新增接口在下面加一行即可
// ============================================================

export const api = {
  // ---- Test ----
  testHello: () => apiGet<TestHelloResponse>("/test/hello"),

  testDb: () => apiGet<TestDbResponse>("/test/db"),

  // ---- Design ----
  designGenerate: (body: DesignGenerateRequest) =>
    apiPost<DesignGenerateResponse>("/design/generate", { json: body }),

  // ---- Intent ----
  intentRecognize: (body: IntentRecognizeRequest) =>
    apiPost<IntentRecognizeResponse>("/intent/recognize", { json: body }),
};
