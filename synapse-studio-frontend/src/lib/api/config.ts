/**
 * 业务 REST API 基址（无末尾斜杠）。默认本地后端。
 * 覆盖方式：在 `.env.local` 中设置 `NEXT_PUBLIC_API_BASE_URL`。
 */
const DEFAULT_API_BASE = "http://localhost:5000";

/** 与后端路由约定一致的前缀 */
export const API_VERSION_PREFIX = "/api/v1";

/**
 * 浏览器侧同源代理前缀，与 `next.config.ts` 中 `rewrites` 的 `source` 一致。
 * 页面在 :3000、接口在 :5000 时避免 CORS。
 */
export const API_BROWSER_PROXY_PREFIX = "/api-proxy";

export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const base = (raw && raw.length > 0 ? raw : DEFAULT_API_BASE).replace(
    /\/+$/,
    "",
  );
  return base;
}

/** 后端上的版本根路径（展示、服务端 fetch 用），例如 `http://localhost:5000/api/v1` */
export function getApiUpstreamVersionRoot(): string {
  return `${getApiBaseUrl()}${API_VERSION_PREFIX}`;
}

/**
 * `fetch` 实际使用的版本根路径。
 * - 服务端 / RSC：直连 `getApiUpstreamVersionRoot()`（无 CORS）。
 * - 浏览器：默认走同源 `/api-proxy/api/v1`，由 Next 转发至后端；若设置
 *   `NEXT_PUBLIC_API_USE_DIRECT_URL=true` 则仍直连（需后端 CORS）。
 */
export function getApiVersionRoot(): string {
  if (typeof window !== "undefined") {
    if (process.env.NEXT_PUBLIC_API_USE_DIRECT_URL === "true") {
      return getApiUpstreamVersionRoot();
    }
    return `${API_BROWSER_PROXY_PREFIX}${API_VERSION_PREFIX}`;
  }
  return getApiUpstreamVersionRoot();
}
