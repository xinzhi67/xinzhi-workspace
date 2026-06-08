/* Shared demo components used across the component library */
import type { ReactNode } from "react";

export function DemoBox({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      {children}
    </div>
  );
}

export function Code({ children }: { children: string }) {
  return <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.82em", padding: "2px 6px", borderRadius: 4, background: "var(--color-space-muted)", color: "var(--color-neural)" }}>{children}</code>;
}

export function Space({ size = 12 }: { size?: number }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: size }} />;
}

/* Button variants for demos */
export function Btn({ variant = "primary", size = "md", disabled = false, children = "按钮" }: {
  variant?: "primary" | "default" | "dashed" | "ghost" | "link";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
  children?: ReactNode;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 500,
    border: "none", textDecoration: "none",
  };
  const sizes: Record<string, React.CSSProperties> = {
    lg: { padding: "10px 28px", borderRadius: 8, fontSize: 16 },
    md: { padding: "8px 22px", borderRadius: 8, fontSize: 14 },
    sm: { padding: "4px 14px", borderRadius: 6, fontSize: 12 },
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, ...sizes[size], background: disabled ? "var(--color-space-muted)" : "var(--color-neural)", color: disabled ? "var(--color-text-muted)" : "#fff" },
    default: { ...base, ...sizes[size], background: "transparent", color: disabled ? "var(--color-text-muted)" : "var(--color-text)", border: `1px solid var(--color-border)` },
    dashed: { ...base, ...sizes[size], background: "transparent", color: disabled ? "var(--color-text-muted)" : "var(--color-text)", border: `1px dashed var(--color-border)` },
    ghost: { ...base, ...sizes[size], background: "transparent", color: disabled ? "var(--color-text-muted)" : "var(--color-text)" },
    link: { ...base, ...sizes[size], background: "transparent", color: disabled ? "var(--color-text-muted)" : "var(--color-neural)", textDecoration: "none" },
  };
  if (variant === "link") return <a style={styles[variant]}>{children}</a>;
  return <button disabled={disabled} style={styles[variant]}>{children}</button>;
}

export function Badge({ tone = "default", children = "标签" }: { tone?: "default" | "success" | "warning" | "error"; children?: ReactNode }) {
  const c: Record<string, { bg: string; color: string }> = {
    default: { bg: "rgba(99,91,255,0.1)", color: "var(--color-neural)" },
    success: { bg: "rgba(56,161,105,0.12)", color: "#22543D" },
    warning: { bg: "rgba(214,158,46,0.12)", color: "#744210" },
    error: { bg: "rgba(229,62,62,0.08)", color: "#9B2C2C" },
  };
  const s = c[tone];
  return <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color }}>{children}</span>;
}

export function Spinner() {
  return <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid var(--color-border)", borderTopColor: "var(--color-neural)", display: "inline-block", animation: "spin 0.75s linear infinite" }} />;
}
