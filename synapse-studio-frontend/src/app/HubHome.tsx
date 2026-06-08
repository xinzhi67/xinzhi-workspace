"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { UiCard, UiText } from "@/components/ui";
import { staggerCards } from "@/lib/motion/presets";
import styles from "./page-section.module.css";

const CARDS = [
  {
    href: "/personal",
    title: "个人空间",
    desc: "本地资料、偏好与导出；后续可对接账号体系。",
  },
  {
    href: "/design",
    title: "UI 设计稿生成",
    desc: "一句话意图、流式 Agent 步骤与设计 Spec 预览。",
  },
  {
    href: "/play",
    title: "娱乐空间",
    desc: "Three.js 场景与 glTF 骨骼动画演示。",
  },
  {
    href: "/library",
    title: "组件库",
    desc: "本项目可复用的 UI 组件：原生 HTML 与统一样式表，便于拼装页面与表单。",
  },
  {
    href: "/test",
    title: "测试空间",
    desc: "对接本地后端，手动触发 REST 接口并查看 JSON 响应与错误信息。",
  },
] as const;

export function HubHome() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    staggerCards(gridRef.current);
  }, []);

  return (
    <>
      <h1 className={styles.title}>工作台</h1>
      <p className={styles.subtitle}>
        Synapse Studio（灵感枢纽）：工作台、设计稿与组件库均为前端能力；智能体编排可在独立后端完成，本仓库也可单独使用组件库搭建界面。
      </p>
      <div ref={gridRef} className={styles.grid}>
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            data-hub-card
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <UiCard interactive>
              <UiText variant="title" as="p">
                {c.title}
              </UiText>
              <UiText variant="muted">{c.desc}</UiText>
              <UiText variant="body" className={styles.cardLink}>
                进入 →
              </UiText>
            </UiCard>
          </Link>
        ))}
      </div>
    </>
  );
}
