"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  UiAlert,
  UiAvatar,
  UiBadge,
  UiBadgeAnchor,
  UiBreadcrumb,
  UiButton,
  UiCard,
  UiCheckbox,
  UiConfirmModal,
  UiEmpty,
  UiGrid,
  UiInput,
  type UiLayoutShellVariant,
  UiLayoutActionRow,
  UiLayoutAutoGrid,
  UiLayoutPage,
  UiLayoutSettingsBlock,
  UiLayoutShell,
  UiLabel,
  UiLink,
  UiProgress,
  UiRadioGroup,
  UiSelect,
  UiSpinner,
  UiStack,
  UiSwitch,
  UiTabs,
  UiText,
  UiTextarea,
} from "@/components/ui";
import libStyles from "../library.module.css";
import { SNIPPETS } from "./snippets";
import type { LibraryItemId } from "./types";

export type DocEntry = {
  title: string;
  description: string;
  snippet: string;
  /** 组合交互：展示与其它 Ui* 的搭配；打断式弹窗仅在少数场景（如 Alert 条目）演示 */
  Demo: () => React.ReactNode;
};

function DemoCell({ children }: { children: React.ReactNode }) {
  return <div className={libStyles.demoCell}>{children}</div>;
}

function DemoSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <UiText variant="muted" as="p" className={libStyles.demoSectionLabel}>
      {children}
    </UiText>
  );
}

export const DOCS: Record<LibraryItemId, DocEntry> = {
  intro: {
    title: "概述",
    description:
      "演示区以布局与真实状态为主；内联提示见 Alert，打断确认见确认弹窗条目。",
    snippet: SNIPPETS.intro,
    Demo: () => (
      <UiStack direction="column" gap={12}>
        <UiText variant="body">
          所有 <code style={{ color: "var(--color-neural)" }}>@/components/ui</code>{" "}
          仅依赖原生 HTML；样式按组件拆在 <code>src/components/ui/*.module.css</code>（与同名 <code>Ui*.tsx</code> 一一对应）。
        </UiText>
        <DemoSectionLabel>
          各组件演示不默认挂提示；<code>?c=layout-presets</code> 封装布局；<code>?c=alert</code> 内联条带；<code>?c=confirm-modal</code> 确认弹窗。
        </DemoSectionLabel>
      </UiStack>
    ),
  },

  "layout-presets": {
    title: "布局预设",
    description:
      "UiLayoutShell 四种壳层 variant；预览区可交互。下方「相关布局」提供左侧菜单条目的跳转或页内说明，避免堆叠无反馈的静态示意。",
    snippet: SNIPPETS["layout-presets"],
    Demo: () => {
      const router = useRouter();
      const pathname = usePathname();
      const [variant, setVariant] = useState<UiLayoutShellVariant>("hcf");
      const [siderCollapsed, setSiderCollapsed] = useState(false);
      const [activeNav, setActiveNav] = useState<"dashboard" | "projects" | "settings">("dashboard");
      const [contentClicks, setContentClicks] = useState(0);
      const [relatedNote, setRelatedNote] = useState<string | null>(null);

      const goDoc = (id: LibraryItemId) => {
        setRelatedNote(null);
        router.replace(`${pathname}?c=${id}`, { scroll: false });
      };

      const navItems: {
        id: typeof activeNav;
        label: string;
        short: string;
      }[] = [
        { id: "dashboard", label: "工作台", short: "工" },
        { id: "projects", label: "项目", short: "项" },
        { id: "settings", label: "设置", short: "设" },
      ];

      const activeTitle =
        activeNav === "dashboard" ? "工作台" : activeNav === "projects" ? "项目" : "设置";

      const shellHeader = (
        <UiStack
          direction="row"
          gap={8}
          style={{ alignItems: "center", flexWrap: "wrap", width: "100%" }}
        >
          <UiBreadcrumb
            items={[
              { label: "组件库", href: "/library" },
              { label: "布局预设", href: "/library?c=layout-presets" },
              { label: activeTitle, current: true },
            ]}
          />
          <UiButton type="button" variant="ghost" onClick={() => setContentClicks((n) => n + 1)}>
            顶栏操作
          </UiButton>
        </UiStack>
      );

      const shellFooter = (
        <UiStack direction="row" gap={10} style={{ alignItems: "center", flexWrap: "wrap" }}>
          <UiText variant="muted" as="span">
            页脚区
          </UiText>
          <UiLink href="https://example.com" target="_blank" rel="noreferrer">
            外链帮助
          </UiLink>
        </UiStack>
      );

      const shellContent = (
        <UiStack direction="column" gap={8} style={{ width: "100%" }}>
          <UiText variant="body" as="p">
            主内容：<strong>{activeTitle}</strong>（由侧栏切换；无侧栏 variant 时仍可点顶栏）
          </UiText>
          <UiLayoutActionRow>
            <UiButton type="button" variant="secondary" onClick={() => setContentClicks((n) => n + 1)}>
              主区按钮（{contentClicks}）
            </UiButton>
            <UiButton type="button" variant="ghost" onClick={() => setContentClicks(0)}>
              清零
            </UiButton>
          </UiLayoutActionRow>
        </UiStack>
      );

      const shellSider = (
        <UiStack direction="column" gap={6} style={{ width: "100%" }}>
          <UiButton
            type="button"
            variant="ghost"
            className={libStyles.layoutDemoNavBtn}
            onClick={() => setSiderCollapsed((c) => !c)}
            title={siderCollapsed ? "展开侧栏" : "收起侧栏"}
          >
            {siderCollapsed ? "»" : "« 收起"}
          </UiButton>
          {navItems.map(({ id, label, short }) => (
            <UiButton
              key={id}
              type="button"
              variant={activeNav === id ? "primary" : "ghost"}
              className={libStyles.layoutDemoNavBtn}
              onClick={() => setActiveNav(id)}
            >
              {siderCollapsed ? short : label}
            </UiButton>
          ))}
        </UiStack>
      );

      const variantMeta: Record<
        UiLayoutShellVariant,
        { label: string; hint: string }
      > = {
        hcf: {
          label: "上下三栏",
          hint: "variant=\"hcf\"：Header → Content → Footer 纵向三栏。",
        },
        "sider-start": {
          label: "左 Sider",
          hint: "variant=\"sider-start\"：顶底通栏，中部为 Sider | Content。",
        },
        "sider-end": {
          label: "右 Sider",
          hint: "variant=\"sider-end\"：顶底通栏，中部为 Content | Sider。",
        },
        "sider-rail": {
          label: "通高 Sider",
          hint: "variant=\"sider-rail\"：左侧通高 Sider，右侧 Header + Content + Footer。",
        },
      };
      return (
        <UiStack direction="column" gap={16}>
          <div className={libStyles.gallerySection}>
            <h3 className={libStyles.galleryH3}>经典四格（UiLayoutShell）</h3>
            <p className={libStyles.galleryP}>
              <strong>Header</strong> 内为面包屑与可点按钮；含侧栏的 variant 中侧栏可折叠（
              <code>siderCollapsed</code>
              ）；<strong>Content</strong> / <strong>Footer</strong> 同样为真实组件。下方为同一预览区，切换
              variant 观察栅格变化。
            </p>
            <DemoSectionLabel>布局状态</DemoSectionLabel>
            <div className={libStyles.layoutVariantButtons}>
              {(Object.keys(variantMeta) as UiLayoutShellVariant[]).map((k) => (
                <UiButton
                  key={k}
                  type="button"
                  variant={variant === k ? "primary" : "secondary"}
                  onClick={() => setVariant(k)}
                >
                  {variantMeta[k].label}
                </UiButton>
              ))}
            </div>
            <UiText variant="muted" as="p">
              当前：<code>{variant}</code> — {variantMeta[variant].hint}
            </UiText>
            <div className={libStyles.layoutShellPreview}>
              {variant === "hcf" ? (
                <UiLayoutShell
                  key={variant}
                  variant="hcf"
                  header={shellHeader}
                  content={shellContent}
                  footer={shellFooter}
                />
              ) : (
                <UiLayoutShell
                  key={variant}
                  variant={variant}
                  siderCollapsed={siderCollapsed}
                  header={shellHeader}
                  sider={shellSider}
                  content={shellContent}
                  footer={shellFooter}
                />
              )}
            </div>
          </div>

          <div className={libStyles.gallerySection}>
            <h3 className={libStyles.galleryH3}>相关布局组件</h3>
            <p className={libStyles.galleryP}>
              上一块专门演示 <code>UiLayoutShell</code>。下列工具在左侧菜单里大多有<strong>独立条目</strong>
              （可跳转、可看代码）；没有单独条目的，用「说明」在<strong>本页下方</strong>展示一段即时反馈。
            </p>
            <div className={libStyles.directGrid}>
              <div className={libStyles.directBlock}>
                <div className={libStyles.cardTitle}>UiLayoutPage</div>
                <p className={libStyles.notes}>整页主栏：最大宽度 + 内边距，与 Container 条目同一脉络。</p>
                <UiButton type="button" variant="secondary" onClick={() => goDoc("container")}>
                  打开 Container 演示
                </UiButton>
              </div>
              <div className={libStyles.directBlock}>
                <div className={libStyles.cardTitle}>UiLayoutActionRow / UiLayoutFormFields</div>
                <p className={libStyles.notes}>操作行与表单纵向堆叠，基于 Stack 间距约定。</p>
                <UiButton type="button" variant="secondary" onClick={() => goDoc("stack")}>
                  打开 Stack 演示
                </UiButton>
              </div>
              <div className={libStyles.directBlock}>
                <div className={libStyles.cardTitle}>UiLayoutAutoGrid</div>
                <p className={libStyles.notes}>自适应卡片栅格，见 Grid 条目中的用法与代码。</p>
                <UiButton type="button" variant="secondary" onClick={() => goDoc("grid")}>
                  打开 Grid 演示
                </UiButton>
              </div>
              <div className={libStyles.directBlock}>
                <div className={libStyles.cardTitle}>UiLayoutSettingsBlock</div>
                <p className={libStyles.notes}>设置分组标题 + 内容 + 分割线，与 Divider 条目呼应。</p>
                <UiButton type="button" variant="secondary" onClick={() => goDoc("divider")}>
                  打开 Divider 演示
                </UiButton>
              </div>
              <div className={libStyles.directBlock}>
                <div className={libStyles.cardTitle}>UiLayoutSplit / UiLayoutHeaderBody</div>
                <p className={libStyles.notes}>无单独菜单项：侧栏分栏、顶栏 + 可滚动正文，常与 Shell 或页面级路由组合使用。</p>
                <UiLayoutActionRow>
                  <UiButton
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setRelatedNote(
                        "UiLayoutSplit：传入 sidebar 与 children，窄屏自动纵向堆叠。UiLayoutHeaderBody：固定 header，下方 body 区域滚动，适合工作台/设置子页。",
                      )
                    }
                  >
                    在本页查看说明
                  </UiButton>
                </UiLayoutActionRow>
              </div>
            </div>
            {relatedNote ? (
              <UiAlert tone="info" className={libStyles.layoutRelatedNote}>
                {relatedNote}
              </UiAlert>
            ) : null}
          </div>
        </UiStack>
      );
    },
  },

  container: {
    title: "Container",
    description: "原子：最大宽度 + 水平内边距。整页主栏请优先用 UiLayoutPage。",
    snippet: SNIPPETS.container,
    Demo: () => {
      const [n, setN] = useState(0);
      return (
        <UiStack direction="column" gap={12}>
          <UiText variant="muted" as="p">
            下为 <code>UiLayoutPage</code>（内部即 UiContainer + 纵向节奏）。
          </UiText>
          <UiLayoutPage>
            <UiText variant="body">内容随视口居中裁切最大宽度。</UiText>
            <UiButton variant="primary" onClick={() => setN((x) => x + 1)}>
              在容器内点击（{n}）
            </UiButton>
          </UiLayoutPage>
        </UiStack>
      );
    },
  },

  stack: {
    title: "Stack",
    description: "原子：flex 横/纵与 gap。操作条、表单堆叠见 UiLayoutActionRow / UiLayoutFormFields。",
    snippet: SNIPPETS.stack,
    Demo: () => {
      const [dense, setDense] = useState(false);
      return (
        <UiStack direction="column" gap={12}>
          <UiStack direction="row" gap={8}>
            <UiButton variant={!dense ? "primary" : "ghost"} onClick={() => setDense(false)}>
              预设：操作行
            </UiButton>
            <UiButton variant={dense ? "primary" : "ghost"} onClick={() => setDense(true)}>
              原子：Stack 列
            </UiButton>
          </UiStack>
          {!dense ? (
            <UiLayoutActionRow>
              <UiBadge>筛选</UiBadge>
              <UiButton variant="secondary">导出</UiButton>
              <UiButton variant="primary">新建</UiButton>
            </UiLayoutActionRow>
          ) : (
            <UiStack direction="column" gap={6}>
              <UiText variant="body">gap=6 的纵向 Stack</UiText>
              <UiText variant="muted">用于紧凑说明列表</UiText>
            </UiStack>
          )}
        </UiStack>
      );
    },
  },

  grid: {
    title: "Grid",
    description: "原子：任意 templateColumns。卡片平铺请用 UiLayoutAutoGrid。",
    snippet: SNIPPETS.grid,
    Demo: () => (
      <UiStack direction="column" gap={12}>
        <UiText variant="muted" as="p">下为 <code>UiLayoutAutoGrid</code>（内部为 CSS Grid）。</UiText>
        <UiLayoutAutoGrid minColumn="6.5rem" gap={8}>
          <DemoCell>KPI</DemoCell>
          <DemoCell>趋势</DemoCell>
          <DemoCell>明细</DemoCell>
        </UiLayoutAutoGrid>
        <DemoSectionLabel>对照：固定三列 UiGrid</DemoSectionLabel>
        <UiGrid templateColumns="repeat(3, minmax(0, 1fr))" gap={8}>
          <DemoCell>1</DemoCell>
          <DemoCell>2</DemoCell>
          <DemoCell>3</DemoCell>
        </UiGrid>
      </UiStack>
    ),
  },

  divider: {
    title: "Divider",
    description: "原子：水平线。设置页分组请用 UiLayoutSettingsBlock（内含标题 + 分割线）。",
    snippet: SNIPPETS.divider,
    Demo: () => (
      <UiStack direction="column" gap={12}>
        <UiLayoutSettingsBlock title="账户">
          <UiText variant="body">邮箱、密码、二次验证…</UiText>
        </UiLayoutSettingsBlock>
        <UiLayoutSettingsBlock title="外观" withDivider={false}>
          <UiText variant="body">主题与字体；最后一组不画尾部分割线。</UiText>
        </UiLayoutSettingsBlock>
      </UiStack>
    ),
  },

  button: {
    title: "Button",
    description: "主/次/幽灵与禁用态；变体行用一行文案记录最近一次点击。",
    snippet: SNIPPETS.button,
    Demo: () => {
      const [n, setN] = useState(0);
      const [last, setLast] = useState<string | null>(null);
      return (
        <UiStack direction="column" gap={12}>
          <DemoSectionLabel>主交互：计数</DemoSectionLabel>
          <UiButton variant="primary" onClick={() => setN((x) => x + 1)}>
            点击计数：{n}
          </UiButton>
          <DemoSectionLabel>变体</DemoSectionLabel>
          <UiStack direction="row" gap={8} className={libStyles.alignCenter}>
            <UiButton variant="primary" onClick={() => setLast("主操作")}>
              主操作
            </UiButton>
            <UiButton variant="secondary" onClick={() => setLast("次要")}>
              次要
            </UiButton>
            <UiButton variant="ghost" onClick={() => setLast("幽灵")}>
              幽灵
            </UiButton>
            <UiButton variant="primary" disabled>
              禁用
            </UiButton>
          </UiStack>
          {last ? (
            <UiText variant="muted" as="p">
              最近一次点击：{last}
            </UiText>
          ) : null}
        </UiStack>
      );
    },
  },

  text: {
    title: "Text",
    description: "用按钮切换展示段落风格；预览区即反馈。",
    snippet: SNIPPETS.text,
    Demo: () => {
      const [v, setV] = useState<"title" | "body" | "muted">("body");
      return (
        <UiStack direction="column" gap={12}>
          <UiStack direction="row" gap={8} className={libStyles.alignCenter}>
            <UiButton variant={v === "title" ? "primary" : "ghost"} onClick={() => setV("title")}>
              标题
            </UiButton>
            <UiButton variant={v === "body" ? "primary" : "ghost"} onClick={() => setV("body")}>
              正文
            </UiButton>
            <UiButton variant={v === "muted" ? "primary" : "ghost"} onClick={() => setV("muted")}>
              弱化
            </UiButton>
          </UiStack>
          {v === "title" ? (
            <UiText variant="title" as="p">大号标题文案</UiText>
          ) : v === "body" ? (
            <UiText variant="body">正文：用于段落与说明。</UiText>
          ) : (
            <UiText variant="muted">辅助说明、时间戳等弱化信息。</UiText>
          )}
          <UiText variant="muted" as="p">当前 variant：<code>{v}</code></UiText>
        </UiStack>
      );
    },
  },

  badge: {
    title: "Badge",
    description:
      "UiBadgeAnchor：未读数 / 气泡 / 红点；可选左下或右下柔和小箭头（arrow）。数字勿与按钮正文重复。UiBadge 可作行内标签。",
    snippet: SNIPPETS.badge,
    Demo: () => {
      const [unread, setUnread] = useState(3);
      const [bulk, setBulk] = useState(100);
      return (
        <UiStack direction="column" gap={8}>
          <DemoSectionLabel>右上角气泡（UiBadgeAnchor）</DemoSectionLabel>
          <UiText variant="muted" as="p">
            小箭头为 <strong>border 三角</strong>，颜色随子级 <code>UiBadge</code> 的 <code>data-tone</code> 与气泡一致；红点为深红尾。位置：<code>bottom-left</code> /{" "}
            <code>bottom-right</code>；「发现」用 <code>none</code>。请配置 <code>aria-label</code>。
          </UiText>
          <UiStack direction="row" gap={12} className={libStyles.alignCenter} style={{ flexWrap: "wrap" }}>
            <UiBadgeAnchor count={unread} aria-label={`消息，${unread} 条未读`}>
              <UiButton variant="secondary" type="button" onClick={() => setUnread((n) => (n >= 9 ? 0 : n + 1))}>
                消息
              </UiButton>
            </UiBadgeAnchor>
            <UiBadgeAnchor
              count={bulk}
              countMax={99}
              arrow="bottom-right"
              aria-label="通知超过 99 条"
            >
              <UiButton variant="secondary" type="button" onClick={() => setBulk((n) => (n >= 120 ? 3 : n + 20))}>
                通知
              </UiButton>
            </UiBadgeAnchor>
            <UiBadgeAnchor arrow="none" bubble={<UiBadge size="sm">NEW</UiBadge>} aria-label="新功能">
              <UiButton variant="ghost" type="button">
                发现
              </UiButton>
            </UiBadgeAnchor>
            <UiBadgeAnchor dot aria-label="有未读">
              <UiAvatar label="Synapse" />
            </UiBadgeAnchor>
          </UiStack>
        </UiStack>
      );
    },
  },

  avatar: {
    title: "Avatar",
    description: "输入昵称后点击更新；首字母由 Avatar 即时体现。",
    snippet: SNIPPETS.avatar,
    Demo: () => {
      const [label, setLabel] = useState("Synapse");
      const [draft, setDraft] = useState("Synapse");
      return (
        <UiStack direction="column" gap={12}>
          <UiStack direction="row" gap={12} className={libStyles.alignCenter}>
            <UiAvatar label={label} />
            <UiAvatar label="Img" src="/next.svg" alt="logo" />
          </UiStack>
          <UiLabel htmlFor="av-draft">首字母来源</UiLabel>
          <UiInput id="av-draft" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="输入 1–2 字" />
          <UiButton variant="primary" onClick={() => setLabel(draft.trim() || "?")}>
            更新头像
          </UiButton>
          <UiText variant="muted" as="p">当前展示首字母：<code>{label}</code></UiText>
        </UiStack>
      );
    },
  },

  link: {
    title: "Link",
    description: "外链与复制操作；结果用内联条带即可，不必弹窗。",
    snippet: SNIPPETS.link,
    Demo: () => {
      const [clip, setClip] = useState<{ tone: "success" | "error"; text: string } | null>(null);
      return (
        <UiStack direction="column" gap={10}>
          <UiStack direction="row" gap={12} className={libStyles.alignCenter}>
            <UiLink href="https://developer.mozilla.org" target="_blank" rel="noreferrer">
              打开 MDN
            </UiLink>
            <UiButton
              variant="secondary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setClip({ tone: "success", text: "当前页链接已复制到剪贴板。" });
                } catch {
                  setClip({ tone: "error", text: "复制失败，请手动复制。" });
                }
              }}
            >
              复制本页链接
            </UiButton>
          </UiStack>
          {clip ? <UiAlert tone={clip.tone}>{clip.text}</UiAlert> : null}
        </UiStack>
      );
    },
  },

  breadcrumb: {
    title: "Breadcrumb",
    description: "与按钮组合切换层级；路径结构即主要信息。",
    snippet: SNIPPETS.breadcrumb,
    Demo: () => {
      const [deep, setDeep] = useState(true);
      return (
        <UiStack direction="column" gap={12}>
          <UiBreadcrumb
            items={
              deep
                ? [
                    { label: "工作台", href: "/" },
                    { label: "组件库", href: "/library" },
                    { label: "Breadcrumb", current: true },
                  ]
                : [
                    { label: "工作台", href: "/" },
                    { label: "组件库", current: true },
                  ]
            }
          />
          <UiButton variant="secondary" onClick={() => setDeep((d) => !d)}>
            {deep ? "模拟返回上一级" : "再进入深层"}
          </UiButton>
          <UiText variant="muted" as="p">{deep ? "当前为深层路径（三级）。" : "当前为浅层路径（两级）。"}</UiText>
        </UiStack>
      );
    },
  },

  label: {
    title: "Label",
    description: "与 Input、提交组成最小表单流；校验结果用内联 Alert。",
    snippet: SNIPPETS.label,
    Demo: () => {
      const [v, setV] = useState("");
      const [msg, setMsg] = useState<{ tone: "success" | "warning"; text: string } | null>(null);
      return (
        <UiStack direction="column" gap={10}>
          <UiLabel htmlFor="lib-email2">工作邮箱</UiLabel>
          <UiInput id="lib-email2" type="email" value={v} onChange={(e) => setV(e.target.value)} placeholder="name@company.com" />
          <UiButton
            variant="primary"
            onClick={() =>
              setMsg(
                v.includes("@")
                  ? { tone: "success", text: `格式通过，将提交：${v}` }
                  : { tone: "warning", text: "请输入含 @ 的邮箱再提交。" },
              )
            }
          >
            校验
          </UiButton>
          {msg ? <UiAlert tone={msg.tone}>{msg.text}</UiAlert> : null}
        </UiStack>
      );
    },
  },

  input: {
    title: "Input",
    description: "输入 + 提交；回显用内联条带。",
    snippet: SNIPPETS.input,
    Demo: () => {
      const [v, setV] = useState("");
      const [echo, setEcho] = useState<string | null>(null);
      return (
        <UiStack direction="column" gap={10}>
          <UiInput value={v} onChange={(e) => setV(e.target.value)} placeholder="输入任意内容后提交" />
          <UiButton variant="primary" onClick={() => setEcho(v || "（空）")}>
            提交
          </UiButton>
          {echo !== null ? (
            <UiAlert tone="success">{`已读取输入：「${echo}」`}</UiAlert>
          ) : null}
        </UiStack>
      );
    },
  },

  textarea: {
    title: "Textarea",
    description: "多行输入 + 提交摘要；内联信息条即可。",
    snippet: SNIPPETS.textarea,
    Demo: () => {
      const [t, setT] = useState("第一行\n第二行");
      const [sum, setSum] = useState<string | null>(null);
      return (
        <UiStack direction="column" gap={10}>
          <UiTextarea rows={4} value={t} onChange={(e) => setT(e.target.value)} />
          <UiButton variant="secondary" onClick={() => setSum(`共 ${t.split("\n").length} 行，${t.length} 字。`)}>
            生成摘要
          </UiButton>
          {sum ? <UiAlert tone="info">{sum}</UiAlert> : null}
        </UiStack>
      );
    },
  },

  select: {
    title: "Select",
    description: "变更选项；当前值用一行文案说明即可。",
    snippet: SNIPPETS.select,
    Demo: () => {
      const [v, setV] = useState("a");
      return (
        <UiStack direction="column" gap={10}>
          <UiSelect
            options={[
              { value: "a", label: "环境 A" },
              { value: "b", label: "环境 B" },
              { value: "c", label: "环境 C" },
            ]}
            value={v}
            onChange={(e) => setV(e.target.value)}
          />
          <UiText variant="muted" as="p">当前选中：<code>{v.toUpperCase()}</code></UiText>
        </UiStack>
      );
    },
  },

  checkbox: {
    title: "Checkbox",
    description: "勾选状态由控件与一行说明共同表达。",
    snippet: SNIPPETS.checkbox,
    Demo: () => {
      const [c, setC] = useState(false);
      return (
        <UiStack direction="column" gap={10}>
          <UiCheckbox
            id="lib-chk2"
            label="我同意使用条款"
            checked={c}
            onChange={(e) => setC(e.target.checked)}
          />
          <UiText variant="muted" as="p">
            {c ? "已勾选，可继续后续流程。" : "未勾选。"}
          </UiText>
        </UiStack>
      );
    },
  },

  radio: {
    title: "RadioGroup",
    description: "切换单选；当前值用弱化文案列出。",
    snippet: SNIPPETS.radio,
    Demo: () => {
      const [r, setR] = useState("dev");
      return (
        <UiStack direction="column" gap={10}>
          <UiRadioGroup
            name="lib-role2"
            legend="角色"
            options={[
              { value: "dev", label: "开发" },
              { value: "design", label: "设计" },
              { value: "pm", label: "产品" },
            ]}
            value={r}
            onChange={setR}
          />
          <UiText variant="muted" as="p">当前 value：<code>{r}</code></UiText>
        </UiStack>
      );
    },
  },

  switch: {
    title: "Switch",
    description: "开关与内联说明条（非弹窗）即可表达状态。",
    snippet: SNIPPETS.switch,
    Demo: () => {
      const [on, setOn] = useState(true);
      return (
        <UiStack direction="column" gap={10}>
          <UiStack direction="row" gap={12} className={libStyles.alignCenter}>
            <UiSwitch checked={on} onCheckedChange={setOn} aria-label="通知" />
            <UiText variant="body">推送通知</UiText>
          </UiStack>
          <UiAlert tone={on ? "success" : "warning"}>
            {on ? "通知已开启（与开关状态联动）。" : "通知已关闭。"}
          </UiAlert>
        </UiStack>
      );
    },
  },

  alert: {
    title: "Alert",
    description: "仅页内状态条（四种 tone）；遮罩式纯确认请使用「确认弹窗」条目中的 UiConfirmModal。",
    snippet: SNIPPETS.alert,
    Demo: () => (
      <UiStack direction="column" gap={10}>
        <UiText variant="muted" as="p">
          不承担弹窗确认；与表单、列表搭配作轻量反馈即可。
        </UiText>
        <UiAlert tone="info">信息：保存后将同步到云端。</UiAlert>
        <UiAlert tone="success">成功：任务已完成。</UiAlert>
        <UiAlert tone="warning">警告：请检查输入。</UiAlert>
        <UiAlert tone="error">错误：请求被拒绝。</UiAlert>
      </UiStack>
    ),
  },

  "confirm-modal": {
    title: "确认弹窗",
    description:
      "UiConfirmModal：标题、二级文案、底部确认；取消与顶部装饰弧线可选（默认不展示）。",
    snippet: SNIPPETS["confirm-modal"],
    Demo: () => {
      type Cfg = {
        title: string;
        description?: string;
        showCancel: boolean;
        decorativeCurve: boolean;
      };
      const [cfg, setCfg] = useState<Cfg | null>(null);
      return (
        <UiStack direction="column" gap={12}>
          <UiText variant="muted" as="p">
            纯确认默认仅「确认」；需要放弃操作时打开 <code>showCancel</code>。装饰弧线由{" "}
            <code>decorativeCurve</code> 控制，默认关闭。
          </UiText>
          <UiStack direction="row" gap={8} className={libStyles.alignCenter}>
            <UiButton
              variant="secondary"
              onClick={() =>
                setCfg({
                  title: "保存更改",
                  description: "将写入本地配置。若未备份，请先导出后再继续。",
                  showCancel: false,
                  decorativeCurve: false,
                })
              }
            >
              纯确认（仅确认）
            </UiButton>
            <UiButton
              variant="secondary"
              onClick={() =>
                setCfg({
                  title: "删除会话？",
                  description: "此操作不可撤销，相关消息将从本机清除。",
                  showCancel: true,
                  decorativeCurve: false,
                })
              }
            >
              确认 + 取消
            </UiButton>
            <UiButton
              variant="secondary"
              onClick={() =>
                setCfg({
                  title: "发布到预览环境",
                  description: "流水线约需 2 分钟；发布期间预览站可能短暂不可用。",
                  showCancel: true,
                  decorativeCurve: true,
                })
              }
            >
              双按钮 + 顶部弧线
            </UiButton>
          </UiStack>
          <UiConfirmModal
            open={cfg !== null}
            title={cfg?.title ?? ""}
            description={cfg?.description}
            showCancel={cfg?.showCancel ?? false}
            decorativeCurve={cfg?.decorativeCurve ?? false}
            onClose={() => setCfg(null)}
            onConfirm={() => setCfg(null)}
          />
        </UiStack>
      );
    },
  },

  spinner: {
    title: "Spinner",
    description: "点击「模拟请求」出现加载动画；结束用内联成功条即可。",
    snippet: SNIPPETS.spinner,
    Demo: () => {
      const [loading, setLoading] = useState(false);
      const [done, setDone] = useState(false);
      const run = () => {
        setLoading(true);
        setDone(false);
        setTimeout(() => {
          setLoading(false);
          setDone(true);
        }, 1800);
      };
      return (
        <UiStack direction="column" gap={12}>
          <UiButton variant="primary" disabled={loading} onClick={run}>
            {loading ? "请求中…" : "模拟请求 1.8s"}
          </UiButton>
          <UiStack direction="row" gap={12} className={libStyles.alignCenter}>
            {loading ? <UiSpinner /> : <UiText variant="muted">空闲</UiText>}
            {loading ? <UiSpinner size="sm" /> : null}
          </UiStack>
          {done ? <UiAlert tone="success">请求完成（演示结束）。</UiAlert> : null}
        </UiStack>
      );
    },
  },

  progress: {
    title: "Progress",
    description: "加减进度；仅在边界值用内联条带强调。",
    snippet: SNIPPETS.progress,
    Demo: () => {
      const [v, setV] = useState(35);
      const [edge, setEdge] = useState<{ tone: "success" | "warning"; text: string } | null>(null);
      const bump = (d: number) => {
        setV((x) => {
          const nx = Math.min(100, Math.max(0, x + d));
          if (nx === 100) setEdge({ tone: "success", text: "进度已满！" });
          else if (nx === 0) setEdge({ tone: "warning", text: "进度已归零。" });
          else setEdge(null);
          return nx;
        });
      };
      return (
        <UiStack direction="column" gap={12}>
          <UiProgress value={v} />
          <UiStack direction="row" gap={8}>
            <UiButton variant="secondary" onClick={() => bump(-15)}>-15</UiButton>
            <UiButton variant="secondary" onClick={() => bump(15)}>+15</UiButton>
          </UiStack>
          {edge ? <UiAlert tone={edge.tone}>{edge.text}</UiAlert> : null}
        </UiStack>
      );
    },
  },

  tabs: {
    title: "Tabs",
    description: "面板内嵌套操作；记录最后一次动作即可。",
    snippet: SNIPPETS.tabs,
    Demo: () => {
      const [note, setNote] = useState<string | null>(null);
      return (
        <UiStack direction="column" gap={12}>
          <UiTabs
            defaultId="a"
            items={[
              {
                id: "a",
                label: "文档",
                panel: (
                  <UiStack direction="column" gap={8}>
                    <UiText variant="body">此 Tab 内可嵌套任意组件。</UiText>
                    <UiButton variant="secondary" onClick={() => setNote("已在「文档」Tab 点击示例按钮。")}>
                      在文档 Tab 触发操作
                    </UiButton>
                  </UiStack>
                ),
              },
              {
                id: "b",
                label: "API",
                panel: (
                  <UiStack direction="column" gap={8}>
                    <UiButton variant="primary" onClick={() => setNote("已在「API」Tab 点击示例按钮。")}>
                      在 API Tab 触发操作
                    </UiButton>
                  </UiStack>
                ),
              },
            ]}
          />
          {note ? <UiText variant="muted" as="p">{note}</UiText> : null}
        </UiStack>
      );
    },
  },

  card: {
    title: "Card",
    description: "卡片内操作；结果可写在卡片内（不必每次弹窗）。",
    snippet: SNIPPETS.card,
    Demo: () => {
      const [saved, setSaved] = useState(false);
      return (
        <UiStack direction="column" gap={12}>
          <UiCard title="项目概览" interactive>
            <UiStack direction="column" gap={8}>
              <UiText variant="body">点击下方按钮，在卡片内展示已提交状态。</UiText>
              <UiButton variant="primary" onClick={() => setSaved(true)}>
                在卡片内提交
              </UiButton>
              {saved ? (
                <UiStack direction="row" gap={8} className={libStyles.alignCenter}>
                  <UiBadge tone="success">已保存</UiBadge>
                  <UiText variant="muted" as="span">演示：业务里可再接接口或 toast。</UiText>
                </UiStack>
              ) : null}
            </UiStack>
          </UiCard>
        </UiStack>
      );
    },
  },

  empty: {
    title: "Empty",
    description: "「刷新」在空态与列表之间切换；版式变化即反馈。",
    snippet: SNIPPETS.empty,
    Demo: () => {
      const [has, setHas] = useState(false);
      return (
        <UiStack direction="column" gap={12}>
          {has ? (
            <UiCard title="列表已加载">
              <UiText variant="body">这里可以是表格或列表内容。</UiText>
            </UiCard>
          ) : (
            <UiEmpty
              title="暂无数据"
              description="点击刷新模拟拉取到数据。"
              action={
                <UiButton variant="primary" type="button" onClick={() => setHas(true)}>
                  刷新列表
                </UiButton>
              }
            />
          )}
          {has ? (
            <UiButton variant="ghost" onClick={() => setHas(false)}>
              清空回到空态
            </UiButton>
          ) : null}
        </UiStack>
      );
    },
  },
};
