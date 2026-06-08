"use client";

import { useCallback, useEffect, useState } from "react";
import {
  UiAlert,
  UiButton,
  UiCard,
  UiSpinner,
  UiStack,
  UiText,
} from "@/components/ui";
import {
  ApiError,
  api,
  getApiUpstreamVersionRoot,
  getApiVersionRoot,
} from "@/lib/api";
import section from "../page-section.module.css";
import styles from "./test-space.module.css";

/**
 * 避免 SSR 与首帧客户端对 `getApiVersionRoot()` 不一致导致 hydration 警告：
 * 首帧统一展示上游根路径，挂载后再切换为浏览器实际使用的根路径。
 */
function useDisplayedApiVersionRoot(): string {
  const [root, setRoot] = useState(getApiUpstreamVersionRoot);
  useEffect(() => {
    setRoot(getApiVersionRoot());
  }, []);
  return root;
}

type EndpointCase = {
  id: string;
  title: string;
  description: string;
  method: string;
  path: string;
  request: () => Promise<unknown>;
};

const CASES: EndpointCase[] = [
  {
    id: "hello",
    title: "连通性 / Hello",
    description:
      "对应后端 GET /api/v1/test/hello。开发模式下浏览器默认经同源 /api-proxy 转发，避免端口不一致时的 CORS。",
    method: "GET",
    path: "/test/hello",
    request: () => api.testHello(),
  },
];

export function TestSpace() {
  const fetchRoot = useDisplayedApiVersionRoot();
  const upstreamRoot = getApiUpstreamVersionRoot();

  return (
    <>
      <h1 className={section.title}>测试空间</h1>
      <p className={section.subtitle}>
        在此手动触发本地后端接口调用。页面与接口不同端口时，浏览器会拦截跨域请求；
        本项目默认让浏览器请求同源路径{" "}
        <code className={styles.meta}>/api-proxy/…</code>，由 Next 开发服务器转发到{" "}
        <code className={styles.meta}>{upstreamRoot}</code>
        （转发目标可用环境变量{" "}
        <code className={styles.meta}>API_PROXY_TARGET</code> 配置）。
      </p>
      <p className={styles.meta} aria-label="当前 fetch 使用的 API 版本根路径">
        当前 fetch 根：<strong>{fetchRoot}</strong>
      </p>

      <div className={styles.stack}>
        {CASES.map((c) => (
          <EndpointTester key={c.id} spec={c} requestRoot={fetchRoot} />
        ))}
      </div>
    </>
  );
}

function EndpointTester({
  spec,
  requestRoot,
}: {
  spec: EndpointCase;
  requestRoot: string;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await spec.request();
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      if (e instanceof ApiError) {
        setError(
          [
            e.message,
            `HTTP ${e.status} ${e.statusText}`,
            `URL: ${e.url}`,
            e.body !== undefined
              ? `Body:\n${typeof e.body === "string" ? e.body : JSON.stringify(e.body, null, 2)}`
              : "",
          ]
            .filter(Boolean)
            .join("\n"),
        );
      } else {
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      setLoading(false);
    }
  }, [spec]);

  return (
    <UiCard title={spec.title}>
      <UiStack direction="column" gap={12}>
        <UiText variant="muted">{spec.description}</UiText>
        <div className={styles.row}>
          <span className={styles.method}>{spec.method}</span>
          <span className={styles.path}>
            {requestRoot}
            {spec.path.startsWith("/") ? spec.path : `/${spec.path}`}
          </span>
        </div>
        <div className={styles.row}>
          <UiButton type="button" onClick={run} disabled={loading}>
            {loading ? (
              <span className={styles.btnInner}>
                <UiSpinner size="sm" />
                请求中…
              </span>
            ) : (
              "发起请求"
            )}
          </UiButton>
        </div>
        {error ? (
          <UiAlert tone="error">
            <pre className={styles.pre}>{error}</pre>
          </UiAlert>
        ) : null}
        {result ? (
          <UiAlert tone="success">
            <pre className={styles.pre}>{result}</pre>
          </UiAlert>
        ) : !loading && !error ? (
          <p className={styles.emptyHint}>尚未请求，点击「发起请求」查看响应 JSON。</p>
        ) : null}
      </UiStack>
    </UiCard>
  );
}
