import type { LibraryItemId } from "./types";

export const SNIPPETS: Record<LibraryItemId, string> = {
  intro: `// 每个组件的「组合交互演示」将多个 Ui* 串成真实流程（布局、状态、文案）。
// 纯确认用 UiConfirmModal；页内提示用 UiAlert 条带。
// URL: ?c=layout-presets / ?c=confirm-modal / ?c=button 直达某项。`,

  "layout-presets": `import { UiBreadcrumb, UiLayoutShell, UiButton } from "@/components/ui";
import type { UiLayoutShellVariant } from "@/components/ui";

const [variant, setVariant] = useState<UiLayoutShellVariant>("sider-rail");
const [siderCollapsed, setSiderCollapsed] = useState(false);

<UiLayoutShell
  variant={variant}
  siderCollapsed={siderCollapsed}
  header={
    <UiBreadcrumb
      items={[
        { label: "首页", href: "/" },
        { label: "当前页", current: true },
      ]}
    />
  }
  sider={
    <UiButton type="button" variant="ghost" onClick={() => setSiderCollapsed((c) => !c)}>
      折叠
    </UiButton>
  }
  content={<>…</>}
  footer={<>…</>}
/>`,

  container: `import { UiLayoutPage, UiText } from "@/components/ui";

<UiLayoutPage>
  <UiText variant="body">整页主栏：Container + 纵向节奏</UiText>
</UiLayoutPage>`,

  stack: `import { UiLayoutActionRow, UiButton } from "@/components/ui";

<UiLayoutActionRow>
  <UiButton variant="primary">保存</UiButton>
  <UiButton variant="ghost">取消</UiButton>
</UiLayoutActionRow>`,

  grid: `import { UiLayoutAutoGrid } from "@/components/ui";

<UiLayoutAutoGrid minColumn="8rem" gap={10}>
  <div>卡片 A</div>
  <div>卡片 B</div>
</UiLayoutAutoGrid>`,

  divider: `import { UiLayoutSettingsBlock, UiText } from "@/components/ui";

<UiLayoutSettingsBlock title="通知">
  <UiText variant="body">推送与邮件</UiText>
</UiLayoutSettingsBlock>`,

  button: `import { UiButton } from "@/components/ui";

<UiButton variant="primary" onClick={() => {}}>
  提交
</UiButton>
<UiButton variant="secondary">取消</UiButton>
<UiButton variant="ghost">更多</UiButton>`,

  text: `import { UiText } from "@/components/ui";

<UiText variant="title" as="p">标题</UiText>
<UiText variant="body">正文</UiText>
<UiText variant="muted">辅助说明</UiText>`,

  badge: `import { UiBadge, UiBadgeAnchor, UiButton } from "@/components/ui";

<UiBadgeAnchor count={3} aria-label="3 条未读">
  <UiButton variant="secondary" type="button">消息</UiButton>
</UiBadgeAnchor>

<UiBadgeAnchor count={12} arrow="bottom-right" aria-label="12 条">
  <UiButton variant="secondary" type="button">通知</UiButton>
</UiBadgeAnchor>

<UiBadgeAnchor arrow="none" bubble={<UiBadge size="sm">NEW</UiBadge>}>
  <UiButton variant="ghost" type="button">发现</UiButton>
</UiBadgeAnchor>

<UiBadgeAnchor dot aria-label="有未读">
  <UiButton variant="ghost" type="button">⋯</UiButton>
</UiBadgeAnchor>`,

  avatar: `import { UiAvatar } from "@/components/ui";

<UiAvatar label="Synapse Studio" />
<UiAvatar label="Logo" src="/next.svg" alt="logo" />`,

  link: `import { UiLink } from "@/components/ui";

<UiLink href="https://example.com" target="_blank" rel="noreferrer">
  外链
</UiLink>`,

  breadcrumb: `import { UiBreadcrumb } from "@/components/ui";

<UiBreadcrumb
  items={[
    { label: "首页", href: "/" },
    { label: "组件库", current: true },
  ]}
/>`,

  label: `import { UiLabel, UiInput } from "@/components/ui";

<UiLabel htmlFor="email">邮箱</UiLabel>
<UiInput id="email" type="email" placeholder="you@example.com" />`,

  input: `import { UiInput } from "@/components/ui";

const [v, setV] = useState("");
<UiInput value={v} onChange={(e) => setV(e.target.value)} placeholder="请输入" />`,

  textarea: `import { UiTextarea } from "@/components/ui";

<UiTextarea rows={4} value={text} onChange={(e) => setText(e.target.value)} />`,

  select: `import { UiSelect } from "@/components/ui";

<UiSelect
  options={[
    { value: "a", label: "选项 A" },
    { value: "b", label: "选项 B" },
  ]}
  value={v}
  onChange={(e) => setV(e.target.value)}
/>`,

  checkbox: `import { UiCheckbox } from "@/components/ui";

<UiCheckbox
  id="agree"
  label="同意协议"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,

  radio: `import { UiRadioGroup } from "@/components/ui";

<UiRadioGroup
  name="role"
  legend="角色"
  options={[
    { value: "dev", label: "开发" },
    { value: "design", label: "设计" },
  ]}
  value={role}
  onChange={setRole}
/>`,

  switch: `import { UiSwitch } from "@/components/ui";

<UiSwitch
  checked={on}
  onCheckedChange={setOn}
  aria-label="启用通知"
/>`,

  alert: `import { UiAlert } from "@/components/ui";

<UiAlert tone="info">提示信息</UiAlert>
<UiAlert tone="success">成功</UiAlert>
<UiAlert tone="warning">警告</UiAlert>
<UiAlert tone="error">错误</UiAlert>`,

  "confirm-modal": `import { UiConfirmModal } from "@/components/ui";

<UiConfirmModal
  open={open}
  title="保存更改"
  description="将写入本地配置，关闭前请确认已备份。"
  onConfirm={() => { apply(); setOpen(false); }}
  onClose={() => setOpen(false)}
  showCancel
  decorativeCurve={false}
/>`,

  spinner: `import { UiSpinner } from "@/components/ui";

<UiSpinner />
<UiSpinner size="sm" />`,

  progress: `import { UiProgress } from "@/components/ui";

<UiProgress value={60} max={100} />`,

  tabs: `import { UiTabs } from "@/components/ui";

<UiTabs
  items={[
    { id: "1", label: "Tab1", panel: <>内容 1</> },
    { id: "2", label: "Tab2", panel: <>内容 2</> },
  ]}
/>`,

  card: `import { UiCard, UiText, UiButton } from "@/components/ui";

<UiCard title="标题">
  <UiText variant="body">描述</UiText>
  <UiButton variant="primary">操作</UiButton>
</UiCard>`,

  empty: `import { UiEmpty, UiButton } from "@/components/ui";

<UiEmpty
  title="暂无数据"
  description="可在此放说明"
  action={<UiButton variant="secondary">刷新</UiButton>}
/>`,
};
