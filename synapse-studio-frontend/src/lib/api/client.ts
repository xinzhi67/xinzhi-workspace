import { getApiVersionRoot } from "./config";
import { ApiError } from "./errors";

export type ApiRequestInit = RequestInit & {
  /** 若设置则优先于 `body`：自动 `JSON.stringify` 并设置 `Content-Type: application/json` */
  json?: unknown;
};

function joinVersionPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getApiVersionRoot()}${p}`;
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

/**
 * 统一封装的 fetch：基址 + `/api/v1` + `path`（path 形如 `/test/hello`）。
 * 非 2xx 时抛出 {@link ApiError}，`body` 为已尝试解析的 JSON 或原始文本。
 */
export async function apiRequest<T = unknown>(
  path: string,
  init?: ApiRequestInit,
): Promise<T> {
  const url = joinVersionPath(path);
  const { json, headers: hdrs, body: rawBody, ...rest } = init ?? {};
  const headers = new Headers(hdrs ?? undefined);
  let finalBody: BodyInit | null | undefined = rawBody;
  if (json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    finalBody = JSON.stringify(json);
  }

  const res = await fetch(url, {
    ...rest,
    headers,
    body: finalBody,
    credentials: rest.credentials ?? "include",
  });

  const payload = await parseJsonSafe(res);

  if (!res.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof (payload as { message: unknown }).message === "string"
        ? String((payload as { message: string }).message)
        : `请求失败：${res.status} ${res.statusText}`;
    throw new ApiError(message, {
      status: res.status,
      statusText: res.statusText,
      url,
      body: payload,
    });
  }

  return payload as T;
}

export function apiGet<T = unknown>(
  path: string,
  init?: Omit<ApiRequestInit, "method" | "body" | "json">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

export function apiPost<T = unknown>(
  path: string,
  init?: ApiRequestInit,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "POST" });
}

export function apiPut<T = unknown>(
  path: string,
  init?: ApiRequestInit,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "PUT" });
}

export function apiPatch<T = unknown>(
  path: string,
  init?: ApiRequestInit,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "PATCH" });
}

export function apiDelete<T = unknown>(
  path: string,
  init?: ApiRequestInit,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "DELETE" });
}
