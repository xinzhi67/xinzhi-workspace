import type { ReactNode } from "react";
import { Btn, Badge, Spinner, DemoBox, Code } from "./demo-helpers";

export type Category = "通用" | "布局" | "导航" | "数据录入" | "数据展示" | "反馈";
export interface ApiRow { prop: string; desc: string; type: string; default: string; }
export interface DemoSnippet { title: string; desc: string; preview: ReactNode; code: string; }
export interface ComponentDoc { name: string; nameEn: string; desc: string; category: Category; demos: DemoSnippet[]; api: ApiRow[]; }
export const CATEGORIES: Category[] = ["通用", "布局", "导航", "数据录入", "数据展示", "反馈"];

/* ================================================================
   ALL COMPONENT DOCS
   ================================================================ */
function getDocs(): Record<string, ComponentDoc> {
  return {
    /* ---- Button ---- */
    Button: {
      name: "Button 按钮", nameEn: "Button",
      desc: "按钮用于开始一个即时操作。标记了一个操作命令，响应用户点击行为触发相应的业务逻辑。",
      category: "通用",
      demos: [
        {
          title: "按钮类型", desc: "按钮有五种类型：主按钮、默认按钮、虚线按钮、文本按钮和链接按钮。",
          preview: <DemoBox><Btn variant="primary">Primary</Btn><Btn variant="default">Default</Btn><Btn variant="dashed">Dashed</Btn><Btn variant="ghost">Text</Btn><Btn variant="link">Link</Btn></DemoBox>,
          code: `<UiButton variant="primary">Primary</UiButton>\n<UiButton variant="default">Default</UiButton>\n<UiButton variant="dashed">Dashed</UiButton>\n<UiButton variant="ghost">Text</UiButton>\n<UiButton variant="link">Link</UiButton>`,
        },
        { title: "按钮尺寸", desc: "按钮有大、中、小三种尺寸。", preview: <DemoBox><Btn size="lg">Large</Btn><Btn size="md">Default</Btn><Btn size="sm">Small</Btn></DemoBox>, code: `<UiButton size="lg">Large</UiButton>\n<UiButton size="md">Default</UiButton>\n<UiButton size="sm">Small</UiButton>` },
        { title: "禁用状态", desc: "添加 disabled 属性即可让按钮不可用。", preview: <DemoBox><Btn disabled>Disabled</Btn><Btn>Normal</Btn></DemoBox>, code: `<UiButton disabled>Disabled</UiButton>\n<UiButton>Normal</UiButton>` },
        { title: "加载中状态", desc: "添加 loading 属性让按钮进入加载状态。", preview: <Btn variant="primary"><Spinner />&nbsp; Loading</Btn>, code: `<UiButton loading>Loading</UiButton>` },
      ],
      api: [
        { prop: "variant", desc: "按钮类型", type: "primary | default | dashed | ghost | link", default: "default" },
        { prop: "size", desc: "按钮尺寸", type: "lg | md | sm", default: "md" },
        { prop: "disabled", desc: "禁用状态", type: "boolean", default: "false" },
        { prop: "loading", desc: "加载中状态", type: "boolean", default: "false" },
        { prop: "onClick", desc: "点击回调", type: "(e) => void", default: "-" },
        { prop: "htmlType", desc: "原生 type 值", type: "submit | reset | button", default: "button" },
      ],
    },

    /* ---- Icon ---- */
    Icon: {
      name: "Icon 图标", nameEn: "Icon",
      desc: "语义化的矢量图形。使用 SVG 图标库，支持自定义大小和颜色。",
      category: "通用",
      demos: [
        { title: "基本用法", desc: "通过 icon 属性指定图标名称，支持多种常用图标。",
          preview: <DemoBox>{["search","bell","settings","user","heart","star","check","x","chevron-right","menu"].map(n => <svg key={n} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neural)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>)}</DemoBox>,
          code: `<UiIcon icon="search" />\n<UiIcon icon="bell" />\n<UiIcon icon="settings" />\n<UiIcon icon="user" />` },
        { title: "图标尺寸", desc: "通过 size 属性控制图标大小。",
          preview: <DemoBox>{[16,20,28,36].map(s => <svg key={s} width={s} height={s} viewBox="0 0 24 24" fill="var(--color-neural)" stroke="none"><circle cx="12" cy="12" r="10"/></svg>)}</DemoBox>,
          code: `<UiIcon icon="star" size={16} />\n<UiIcon icon="star" size={20} />\n<UiIcon icon="star" size={28} />\n<UiIcon icon="star" size={36} />` },
        { title: "图标颜色", desc: "通过 color 属性设置图标颜色。",
          preview: <DemoBox>{["var(--color-neural)","#E53E3E","#38A169","#D69E2E","#18181B"].map(c => <svg key={c} width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</DemoBox>,
          code: `<UiIcon icon="star" color="#635BFF" />\n<UiIcon icon="star" color="#E53E3E" />\n<UiIcon icon="star" color="#38A169" />` },
      ],
      api: [
        { prop: "icon", desc: "图标名称", type: "string", default: "-" },
        { prop: "size", desc: "图标大小(px)", type: "number", default: "20" },
        { prop: "color", desc: "图标颜色", type: "string", default: "currentColor" },
      ],
    },

    /* ---- Divider ---- */
    Divider: {
      name: "Divider 分割线", nameEn: "Divider",
      desc: "区隔内容的分割线，用于视觉分区与内容分隔。支持水平和垂直方向。",
      category: "布局",
      demos: [
        { title: "水平分割线", desc: "默认为水平分割线，用于分隔上下内容。",
          preview: <div style={{ width: "100%" }}><p style={{ fontSize: 14, margin: "0 0 8px" }}>上方内容</p><div style={{ height: 1, background: "var(--color-border)" }} /><p style={{ fontSize: 14, margin: "8px 0 0" }}>下方内容</p></div>,
          code: `<UiDivider />` },
        { title: "带文字分割线", desc: "分割线中间可以添加文字，用于明确内容分区。",
          preview: <div style={{ width: "100%" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ flex: 1, height: 1, background: "var(--color-border)" }} /><span style={{ fontSize: 13, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>Text</span><div style={{ flex: 1, height: 1, background: "var(--color-border)" }} /></div></div>,
          code: `<UiDivider>Text</UiDivider>` },
        { title: "虚线分割", desc: "设置 dashed 属性显示虚线分割线。",
          preview: <div style={{ width: "100%", height: 1, background: "repeating-linear-gradient(90deg, var(--color-border) 0, var(--color-border) 6px, transparent 6px, transparent 10px)" }} />,
          code: `<UiDivider dashed />` },
      ],
      api: [
        { prop: "type", desc: "方向", type: "horizontal | vertical", default: "horizontal" },
        { prop: "dashed", desc: "是否虚线", type: "boolean", default: "false" },
        { prop: "orientation", desc: "文字位置", type: "left | center | right", default: "center" },
      ],
    },

    /* ---- Grid ---- */
    Grid: {
      name: "Grid 栅格", nameEn: "Grid",
      desc: "24 栅格系统，通过行(row)和列(col)来创建响应式布局。",
      category: "布局",
      demos: [
        { title: "基本栅格", desc: "使用 Row 和 Col 组件，col 占 24 份中的若干份。",
          preview: <div style={{ width: "100%" }}>{[["8","16"],["12","12"],["6","18"]].map(([a,b],i) => <div key={i} style={{ display: "flex", gap: 4, marginBottom: 4 }}><div style={{ flex: Number(a), padding: "10px 0", background: "rgba(99,91,255,0.15)", borderRadius: 4, textAlign: "center", fontSize: 13, color: "var(--color-neural)" }}>col-{a}</div><div style={{ flex: Number(b), padding: "10px 0", background: "rgba(99,91,255,0.06)", borderRadius: 4, textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>col-{b}</div></div>)}</div>,
          code: `<UiRow>\n  <UiCol span={8}>col-8</UiCol>\n  <UiCol span={16}>col-16</UiCol>\n</UiRow>` },
        { title: "响应式栅格", desc: "不同屏幕尺寸下使用不同的列宽。",
          preview: <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>{["100%","50%","33%","25%"].map((w,i) => <div key={i} style={{ background: i===0?"rgba(99,91,255,0.15)":"rgba(99,91,255,0.06)", padding: "10px 0", borderRadius: 4, textAlign: "center", fontSize: 12, color: "var(--color-text-muted)" }}>{w}</div>)}</div>,
          code: `<UiCol xs={24} sm={12} md={8} lg={6}>Content</UiCol>` },
      ],
      api: [
        { prop: "span", desc: "列占位格数(1-24)", type: "number", default: "24" },
        { prop: "offset", desc: "左侧偏移格数", type: "number", default: "0" },
        { prop: "xs | sm | md | lg | xl", desc: "响应式断点", type: "number | { span, offset }", default: "-" },
      ],
    },

    /* ---- Space ---- */
    Space: {
      name: "Space 间距", nameEn: "Space",
      desc: "设置组件之间的间距。支持水平和垂直排列，多种预设间距。",
      category: "布局",
      demos: [
        { title: "水平间距", desc: "相邻组件水平排列，可设置不同间距大小。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}><span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 50 }}>small</span><Btn size="sm">1</Btn><Btn size="sm" variant="default">2</Btn><Btn size="sm" variant="dashed">3</Btn></div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 50 }}>middle</span><Btn>1</Btn><Btn variant="default">2</Btn><Btn variant="dashed">3</Btn></div>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}><span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 50 }}>large</span><Btn size="lg">1</Btn><Btn size="lg" variant="default">2</Btn><Btn size="lg" variant="dashed">3</Btn></div>
          </div>,
          code: `<UiSpace size="small">...</UiSpace>\n<UiSpace size="middle">...</UiSpace>\n<UiSpace size="large">...</UiSpace>` },
        { title: "垂直间距", desc: "设置 direction='vertical' 使组件垂直排列。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><Btn>Item 1</Btn><Btn variant="default">Item 2</Btn><Btn variant="dashed">Item 3</Btn></div>,
          code: `<UiSpace direction="vertical">\n  <UiButton>Item 1</UiButton>\n  <UiButton>Item 2</UiButton>\n</UiSpace>` },
      ],
      api: [
        { prop: "direction", desc: "排列方向", type: "horizontal | vertical", default: "horizontal" },
        { prop: "size", desc: "间距大小", type: "small | middle | large | number", default: "small" },
      ],
    },

    /* ---- Breadcrumb ---- */
    Breadcrumb: {
      name: "Breadcrumb 面包屑", nameEn: "Breadcrumb",
      desc: "显示当前页面在系统层级结构中的位置，并能返回上级。",
      category: "导航",
      demos: [
        { title: "基本用法", desc: "最简单的面包屑导航。",
          preview: <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14 }}><span style={{ color: "var(--color-text-muted)" }}>首页</span><span style={{ color: "#ccc" }}>/</span><span style={{ color: "var(--color-text-muted)" }}>组件</span><span style={{ color: "#ccc" }}>/</span><span style={{ color: "var(--color-neural)", fontWeight: 500 }}>Button</span></div>,
          code: `<UiBreadcrumb items={[{title:'首页',href:'/'},{title:'组件'},{title:'Button'}]} />` },
        { title: "带图标", desc: "可在面包屑项中添加图标。",
          preview: <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14 }}><span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-text-muted)" }}>🏠 首页</span><span style={{ color: "#ccc" }}>/</span><span style={{ color: "var(--color-text-muted)" }}>📦 组件</span><span style={{ color: "#ccc" }}>/</span><span style={{ color: "var(--color-neural)", fontWeight: 500 }}>Button</span></div>,
          code: `<UiBreadcrumb items={[{title:<><HomeIcon/>首页</>,href:'/'}]} />` },
      ],
      api: [
        { prop: "items", desc: "面包屑项数组", type: "{ title, href?, icon? }[]", default: "[]" },
        { prop: "separator", desc: "分隔符", type: "string | ReactNode", default: "'/'" },
      ],
    },

    /* ---- Dropdown ---- */
    Dropdown: {
      name: "Dropdown 下拉菜单", nameEn: "Dropdown",
      desc: "向下弹出的菜单列表。当页面上的操作命令过多时，可以用此组件收纳。",
      category: "导航",
      demos: [
        { title: "基本用法", desc: "点击触发下拉菜单，包含多个菜单项。",
          preview: <div style={{ padding: "4px 0", borderRadius: 10, border: "1px solid var(--color-border)", background: "#fff", width: 200, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>{["选项一","选项二","选项三","选项四"].map((o,i) => <div key={o} style={{ padding: "8px 16px", fontSize: 14, cursor: "pointer", background: i===0?"rgba(99,91,255,0.06)":"transparent", color: i===0?"var(--color-neural)":"var(--color-text)" }}>{o}</div>)}</div>,
          code: `<UiDropdown menu={{ items: [{key:'1',label:'选项一'},{key:'2',label:'选项二'}] }}>\n  <UiButton>点击展开</UiButton>\n</UiDropdown>` },
        { title: "分割线与禁用", desc: "菜单项之间可以添加分割线，也可禁用某些项。",
          preview: <div style={{ padding: "4px 0", borderRadius: 10, border: "1px solid var(--color-border)", background: "#fff", width: 200, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}><div style={{ padding: "8px 16px", fontSize: 14, color: "var(--color-text)" }}>编辑</div><div style={{ padding: "8px 16px", fontSize: 14, color: "var(--color-text)" }}>复制</div><div style={{ height: 1, background: "var(--color-border)", margin: "4px 0" }} /><div style={{ padding: "8px 16px", fontSize: 14, color: "#ccc" }}>删除（禁用）</div></div>,
          code: `menu={{ items: [\n  {key:'edit',label:'编辑'},\n  {key:'copy',label:'复制'},\n  {type:'divider'},\n  {key:'del',label:'删除',disabled:true}\n] }}` },
      ],
      api: [
        { prop: "menu", desc: "菜单配置", type: "{ items: ItemType[] }", default: "-" },
        { prop: "trigger", desc: "触发方式", type: "click | hover", default: "click" },
        { prop: "placement", desc: "弹出位置", type: "bottomLeft | bottomRight | topLeft", default: "bottomLeft" },
      ],
    },

    /* ---- Pagination ---- */
    Pagination: {
      name: "Pagination 分页", nameEn: "Pagination",
      desc: "采用分页的形式分隔长列表，每次只加载一个页面。",
      category: "导航",
      demos: [
        { title: "基本用法", desc: "基础分页，显示页码和翻页按钮。",
          preview: <DemoBox>{["<","1","2","3","4","5","...","12",">"].map((p,i) => <span key={i} style={{ minWidth: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 13, cursor: "pointer", background: p==="1"?"var(--color-neural)":"transparent", color: p==="1"?"#fff":"var(--color-text)", border: p==="1"?"none":"1px solid var(--color-border)" }}>{p}</span>)}</DemoBox>,
          code: `<UiPagination current={1} total={120} pageSize={10} />` },
        { title: "简洁模式", desc: "使用 simple 属性显示简洁版分页。",
          preview: <DemoBox><span style={{ fontSize: 14, color: "var(--color-text)" }}>1 / 12</span><Btn size="sm" variant="default">&gt;</Btn></DemoBox>,
          code: `<UiPagination simple current={1} total={120} />` },
        { title: "不同尺寸", desc: "支持 small 尺寸的分页。",
          preview: <DemoBox>{["<","1","2","3",">"].map((p,i) => <span key={i} style={{ minWidth: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 12, cursor: "pointer", background: p==="1"?"var(--color-neural)":"transparent", color: p==="1"?"#fff":"var(--color-text)", border: p==="1"?"none":"1px solid var(--color-border)" }}>{p}</span>)}</DemoBox>,
          code: `<UiPagination size="small" current={1} total={120} />` },
      ],
      api: [
        { prop: "current", desc: "当前页数", type: "number", default: "1" },
        { prop: "total", desc: "数据总数", type: "number", default: "0" },
        { prop: "pageSize", desc: "每页条数", type: "number", default: "10" },
        { prop: "size", desc: "分页尺寸", type: "default | small", default: "default" },
        { prop: "simple", desc: "简洁模式", type: "boolean", default: "false" },
        { prop: "onChange", desc: "页码改变回调", type: "(page) => void", default: "-" },
      ],
    },

    /* ---- Steps ---- */
    Steps: {
      name: "Steps 步骤条", nameEn: "Steps",
      desc: "引导用户按照流程完成任务。当任务复杂或存在先后关系时使用。",
      category: "导航",
      demos: [
        { title: "基本用法", desc: "简单的步骤条，显示当前进度。",
          preview: <DemoBox>{["选择组件","配置属性","预览效果"].map((s,i) => <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 24, height: 24, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", background: i<=0?"var(--color-neural)":"var(--color-space-muted)", color: i<=0?"#fff":"var(--color-text-muted)", fontSize: 12, fontWeight: 600 }}>{i+1}</span><span style={{ fontSize: 13, color: i<=0?"var(--color-text)":"var(--color-text-muted)" }}>{s}</span>{i<2 && <span style={{ color: "var(--color-border)", margin: "0 4px" }}>→</span>}</div>)}</DemoBox>,
          code: `<UiSteps current={0} items={[{title:'选择组件'},{title:'配置属性'},{title:'预览效果'}]} />` },
        { title: "步骤状态", desc: "步骤有等待、进行中、完成、出错四种状态。",
          preview: <DemoBox><span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, background: "rgba(56,161,105,0.08)", color: "#22543D", padding: "4px 10px", borderRadius: 999, fontWeight: 500 }}>✓ 完成</span><span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, background: "rgba(99,91,255,0.08)", color: "var(--color-neural)", padding: "4px 10px", borderRadius: 999, fontWeight: 500 }}>● 进行中</span><span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, background: "rgba(229,62,62,0.06)", color: "#9B2C2C", padding: "4px 10px", borderRadius: 999, fontWeight: 500 }}>✗ 出错</span></DemoBox>,
          code: `<UiSteps.Item status="finish" title="完成" />\n<UiSteps.Item status="process" title="进行中" />\n<UiSteps.Item status="error" title="出错" />` },
      ],
      api: [
        { prop: "current", desc: "当前步骤(0-based)", type: "number", default: "0" },
        { prop: "items", desc: "步骤数组", type: "{title,description?,status?}[]", default: "[]" },
        { prop: "direction", desc: "排列方向", type: "horizontal | vertical", default: "horizontal" },
      ],
    },

    /* ---- Tabs ---- */
    Tabs: {
      name: "Tabs 标签页", nameEn: "Tabs",
      desc: "选项卡切换组件。用于平级区域内容切换。",
      category: "导航",
      demos: [
        { title: "基本用法", desc: "基础的标签页切换。",
          preview: <div><div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--color-border)", marginBottom: 12 }}>{["Tab 1","Tab 2","Tab 3"].map((t,i) => <span key={t} style={{ padding: "8px 18px", fontSize: 14, cursor: "pointer", borderBottom: i===0?"2px solid var(--color-neural)":"2px solid transparent", color: i===0?"var(--color-neural)":"var(--color-text-muted)", fontWeight: i===0?500:400 }}>{t}</span>)}</div><p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Content of Tab 1</p></div>,
          code: `<UiTabs activeKey="1" onChange={setKey}>\n  <UiTabPane tab="Tab 1" key="1">Content 1</UiTabPane>\n  <UiTabPane tab="Tab 2" key="2">Content 2</UiTabPane>\n</UiTabs>` },
        { title: "卡片式标签", desc: "使用卡片样式的标签页。",
          preview: <div style={{ display: "flex", gap: 2 }}>{["Tab 1","Tab 2","Tab 3"].map((t,i) => <span key={t} style={{ padding: "6px 16px", fontSize: 14, cursor: "pointer", background: i===0?"#fff":"var(--color-space-muted)", color: i===0?"var(--color-neural)":"var(--color-text-muted)", borderRadius: "8px 8px 0 0", border: `1px solid ${i===0?"var(--color-border)":"transparent"}`, borderBottomColor: i===0?"#fff":"transparent", fontWeight: i===0?500:400 }}>{t}</span>)}</div>,
          code: `<UiTabs type="card">...</UiTabs>` },
      ],
      api: [
        { prop: "activeKey", desc: "当前激活 tab", type: "string", default: "-" },
        { prop: "type", desc: "标签类型", type: "line | card", default: "line" },
        { prop: "onChange", desc: "切换回调", type: "(key) => void", default: "-" },
      ],
    },

    /* ---- Checkbox ---- */
    Checkbox: {
      name: "Checkbox 复选框", nameEn: "Checkbox",
      desc: "在一组可选项中进行多项选择时的独立操作组件。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的复选框用法。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{["Option A","Option B","Option C"].map((o,i) => <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}><input type="checkbox" defaultChecked={i===0} style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />{o}</label>)}</div>,
          code: `<UiCheckbox checked={true}>Option A</UiCheckbox>\n<UiCheckbox>Option B</UiCheckbox>\n<UiCheckbox>Option C</UiCheckbox>` },
        { title: "禁用状态", desc: "通过 disabled 属性禁用复选框。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><input type="checkbox" disabled style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />Disabled</label><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><input type="checkbox" defaultChecked disabled style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />Checked disabled</label></div>,
          code: `<UiCheckbox disabled>Disabled</UiCheckbox>\n<UiCheckbox disabled checked>Checked</UiCheckbox>` },
        { title: "全选", desc: "通过 indeterminate 实现全选效果。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 6 }}><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}><input type="checkbox" style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />全选</label><div style={{ height: 1, background: "var(--color-border)" }} /><div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 24 }}>{["Apple","Pear","Orange"].map(o => <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><input type="checkbox" defaultChecked style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />{o}</label>)}</div></div>,
          code: `<UiCheckbox indeterminate>全选</UiCheckbox>\n<UiCheckbox checked>Apple</UiCheckbox>\n<UiCheckbox checked>Pear</UiCheckbox>` },
      ],
      api: [
        { prop: "checked", desc: "是否选中", type: "boolean", default: "false" },
        { prop: "disabled", desc: "禁用", type: "boolean", default: "false" },
        { prop: "indeterminate", desc: "半选状态", type: "boolean", default: "false" },
        { prop: "onChange", desc: "变化回调", type: "(e) => void", default: "-" },
      ],
    },

    /* ---- Input ---- */
    Input: {
      name: "Input 输入框", nameEn: "Input",
      desc: "通过鼠标或键盘输入内容，是最基础的表单域。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的输入框用法。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
            <input placeholder="请输入内容" style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "#fff", color: "var(--color-text)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
            <input disabled placeholder="禁用状态" style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-space-muted)", color: "var(--color-text-muted)", fontSize: 14, fontFamily: "inherit" }} />
          </div>,
          code: `<UiInput placeholder="请输入内容" />\n<UiInput disabled placeholder="禁用状态" />` },
        { title: "三种尺寸", desc: "Input 有大、中、小三种尺寸。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
            <input placeholder="Large" style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 16, fontFamily: "inherit", outline: "none" }} />
            <input placeholder="Default" style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
            <input placeholder="Small" style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid var(--color-border)", fontSize: 12, fontFamily: "inherit", outline: "none" }} />
          </div>,
          code: `<UiInput size="lg" placeholder="Large" />\n<UiInput size="md" placeholder="Default" />\n<UiInput size="sm" placeholder="Small" />` },
        { title: "搜索框", desc: "带有搜索图标的输入框。",
          preview: <div style={{ position: "relative", width: 280 }}><svg style={{ position: "absolute", left: 10, top: 9 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input placeholder="搜索..." style={{ width: "100%", padding: "8px 12px 8px 32px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 14, fontFamily: "inherit", outline: "none" }} /></div>,
          code: `<UiInput.Search placeholder="搜索..." onSearch={fn} />` },
      ],
      api: [
        { prop: "placeholder", desc: "占位文字", type: "string", default: "-" },
        { prop: "disabled", desc: "禁用状态", type: "boolean", default: "false" },
        { prop: "size", desc: "尺寸", type: "lg | md | sm", default: "md" },
        { prop: "onChange", desc: "变化回调", type: "(e) => void", default: "-" },
      ],
    },

    /* ---- Radio ---- */
    Radio: {
      name: "Radio 单选框", nameEn: "Radio",
      desc: "用于在多个备选项中选中单个状态。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的单选框。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{["Option 1","Option 2","Option 3"].map((o,i) => <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}><input type="radio" name="demo" defaultChecked={i===0} style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />{o}</label>)}</div>,
          code: `<UiRadio.Group value="1">\n  <UiRadio value="1">Option 1</UiRadio>\n  <UiRadio value="2">Option 2</UiRadio>\n</UiRadio.Group>` },
        { title: "按钮样式", desc: "使用 Radio.Button 实现按钮样式的单选组。",
          preview: <DemoBox><span style={{ padding: "6px 16px", borderRadius: "6px 0 0 6px", border: "1px solid var(--color-neural)", background: "var(--color-neural)", color: "#fff", fontSize: 14, cursor: "pointer" }}>A</span><span style={{ padding: "6px 16px", border: "1px solid var(--color-border)", borderLeft: "none", fontSize: 14, cursor: "pointer" }}>B</span><span style={{ padding: "6px 16px", borderRadius: "0 6px 6px 0", border: "1px solid var(--color-border)", borderLeft: "none", fontSize: 14, cursor: "pointer" }}>C</span></DemoBox>,
          code: `<UiRadio.Group value="a" optionType="button">\n  <UiRadio.Button value="a">A</UiRadio.Button>\n  <UiRadio.Button value="b">B</UiRadio.Button>\n</UiRadio.Group>` },
        { title: "禁用状态", desc: "Radio 和 Radio.Group 均支持禁用。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><input type="radio" disabled style={{ width: 16, height: 16 }} />Disabled</label><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}><input type="radio" defaultChecked disabled style={{ accentColor: "var(--color-neural)", width: 16, height: 16 }} />Checked disabled</label></div>,
          code: `<UiRadio disabled>Disabled</UiRadio>\n<UiRadio disabled checked>Checked</UiRadio>` },
      ],
      api: [
        { prop: "checked", desc: "是否选中", type: "boolean", default: "false" },
        { prop: "disabled", desc: "禁用", type: "boolean", default: "false" },
        { prop: "value", desc: "选项值", type: "string | number", default: "-" },
        { prop: "onChange", desc: "变化回调", type: "(e) => void", default: "-" },
      ],
    },

    /* ---- Select ---- */
    Select: {
      name: "Select 选择器", nameEn: "Select",
      desc: "从一组数据中选择一个或多个选项的下拉组件。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的下拉选择器。",
          preview: <select style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "#fff", color: "var(--color-text)", fontSize: 14, width: 200, fontFamily: "inherit" }}><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>,
          code: `<UiSelect defaultValue="1">\n  <UiSelect.Option value="1">Option 1</UiSelect.Option>\n  <UiSelect.Option value="2">Option 2</UiSelect.Option>\n</UiSelect>` },
        { title: "禁用状态", desc: "选择器或选项可以设置为禁用。",
          preview: <select disabled style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-space-muted)", color: "var(--color-text-muted)", fontSize: 14, width: 200, fontFamily: "inherit" }}><option>Disabled select</option></select>,
          code: `<UiSelect disabled>\n  <UiSelect.Option value="1">Option 1</UiSelect.Option>\n</UiSelect>` },
        { title: "多选模式", desc: "设置 mode='multiple' 启用多选。",
          preview: <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "6px 10px", borderRadius: 8, border: "1px solid var(--color-neural)", background: "#fff", width: 260 }}><span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(99,91,255,0.08)", color: "var(--color-neural)", fontSize: 12 }}>Tag 1 ✕</span><span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(99,91,255,0.08)", color: "var(--color-neural)", fontSize: 12 }}>Tag 2 ✕</span><span style={{ fontSize: 12, color: "#ccc" }}>+ 添加</span></div>,
          code: `<UiSelect mode="multiple" defaultValue={['1','2']}>\n  <UiSelect.Option value="1">Tag 1</UiSelect.Option>\n  <UiSelect.Option value="2">Tag 2</UiSelect.Option>\n</UiSelect>` },
      ],
      api: [
        { prop: "mode", desc: "选择模式", type: "default | multiple", default: "default" },
        { prop: "disabled", desc: "禁用", type: "boolean", default: "false" },
        { prop: "placeholder", desc: "占位文字", type: "string", default: "请选择" },
        { prop: "onChange", desc: "选中回调", type: "(value) => void", default: "-" },
      ],
    },

    /* ---- Switch ---- */
    Switch: {
      name: "Switch 开关", nameEn: "Switch",
      desc: "用于切换单个布尔状态，适用于互斥的开/关操作。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的开关。",
          preview: <DemoBox><span style={{ display: "inline-block", width: 44, height: 24, borderRadius: 999, background: "var(--color-neural)", cursor: "pointer", position: "relative" }}><span style={{ position: "absolute", top: 2, left: 22, width: 18, height: 18, borderRadius: 999, background: "#fff" }} /></span><span style={{ display: "inline-block", width: 44, height: 24, borderRadius: 999, background: "var(--color-space-muted)", border: "1px solid var(--color-border)", cursor: "pointer", position: "relative" }}><span style={{ position: "absolute", top: 2, left: 2, width: 18, height: 18, borderRadius: 999, background: "#fff" }} /></span></DemoBox>,
          code: `<UiSwitch defaultChecked />\n<UiSwitch />` },
        { title: "禁用状态", desc: "开关支持禁用状态。",
          preview: <DemoBox><span style={{ display: "inline-block", width: 44, height: 24, borderRadius: 999, background: "var(--color-neural)", opacity: 0.5, cursor: "not-allowed", position: "relative" }}><span style={{ position: "absolute", top: 2, left: 22, width: 18, height: 18, borderRadius: 999, background: "#fff" }} /></span><span style={{ display: "inline-block", width: 44, height: 24, borderRadius: 999, background: "var(--color-space-muted)", border: "1px solid var(--color-border)", opacity: 0.5, cursor: "not-allowed", position: "relative" }}><span style={{ position: "absolute", top: 2, left: 2, width: 18, height: 18, borderRadius: 999, background: "#fff" }} /></span></DemoBox>,
          code: `<UiSwitch disabled defaultChecked />\n<UiSwitch disabled />` },
        { title: "文字与图标", desc: "可以自定义开关内的文字或图标。",
          preview: <DemoBox><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 26, borderRadius: 999, background: "var(--color-neural)", cursor: "pointer", position: "relative", fontSize: 11, color: "#fff", paddingLeft: 8, paddingRight: 22 }}>ON</span><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 26, borderRadius: 999, background: "var(--color-space-muted)", border: "1px solid var(--color-border)", cursor: "pointer", position: "relative", fontSize: 11, color: "var(--color-text-muted)", paddingLeft: 22, paddingRight: 8 }}>OFF</span></DemoBox>,
          code: `<UiSwitch checkedChildren="ON" unCheckedChildren="OFF" />` },
      ],
      api: [
        { prop: "checked", desc: "开关状态", type: "boolean", default: "false" },
        { prop: "disabled", desc: "禁用", type: "boolean", default: "false" },
        { prop: "checkedChildren", desc: "开启时内容", type: "ReactNode", default: "-" },
        { prop: "unCheckedChildren", desc: "关闭时内容", type: "ReactNode", default: "-" },
        { prop: "onChange", desc: "变化回调", type: "(checked) => void", default: "-" },
      ],
    },

    /* ---- Textarea ---- */
    Textarea: {
      name: "Textarea 文本域", nameEn: "Textarea",
      desc: "用于多行文本输入。支持自适应高度与字数统计。",
      category: "数据录入",
      demos: [
        { title: "基本用法", desc: "最简单的多行文本输入。",
          preview: <textarea placeholder="请输入多行文本..." style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "#fff", color: "var(--color-text)", fontSize: 14, width: 300, minHeight: 90, resize: "vertical", fontFamily: "inherit", outline: "none" }} />,
          code: `<UiTextarea placeholder="请输入多行文本..." rows={4} />` },
        { title: "自适应高度", desc: "设置 autoSize 属性让文本域随内容自动调整高度。",
          preview: <textarea placeholder="输入内容自动增高..." rows={3} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border)", background: "#fff", color: "var(--color-text)", fontSize: 14, width: 300, fontFamily: "inherit", outline: "none", resize: "none" }} />,
          code: `<UiTextarea autoSize placeholder="自动调整高度" />` },
      ],
      api: [
        { prop: "placeholder", desc: "占位文字", type: "string", default: "-" },
        { prop: "rows", desc: "显示行数", type: "number", default: "3" },
        { prop: "autoSize", desc: "自适应高度", type: "boolean | {minRows,maxRows}", default: "false" },
        { prop: "maxLength", desc: "最大长度", type: "number", default: "-" },
        { prop: "disabled", desc: "禁用", type: "boolean", default: "false" },
      ],
    },

    /* ---- Card ---- */
    Card: {
      name: "Card 卡片", nameEn: "Card",
      desc: "通用卡片容器。可承载文字、列表、图片、段落等，用于聚合相关信息。",
      category: "数据展示",
      demos: [
        { title: "基本用法", desc: "包含标题和内容的简单卡片。",
          preview: <div style={{ width: 280, borderRadius: 14, border: "1px solid var(--color-border)", background: "#fff", overflow: "hidden" }}><div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", fontWeight: 600, fontSize: 15 }}>卡片标题</div><div style={{ padding: 20, fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6 }}>这是卡片的内容区域，用于承载文字、列表、图片等信息。可以组合多种元素来表达丰富的内容。</div></div>,
          code: `<UiCard title="卡片标题">\n  <p>这是卡片的内容区域...</p>\n</UiCard>` },
        { title: "无边框", desc: "设置 bordered={false} 使用无边框样式。",
          preview: <div style={{ width: 280, borderRadius: 14, background: "#fff", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}><div style={{ padding: "16px 20px", fontWeight: 600, fontSize: 15 }}>无边框卡片</div><div style={{ padding: "0 20px 20px", fontSize: 14, color: "var(--color-text-muted)" }}>无边框的卡片，使用阴影区分层级。</div></div>,
          code: `<UiCard bordered={false} title="无边框卡片">\n  <p>无边框的卡片...</p>\n</UiCard>` },
      ],
      api: [
        { prop: "title", desc: "卡片标题", type: "string | ReactNode", default: "-" },
        { prop: "bordered", desc: "是否显示边框", type: "boolean", default: "true" },
        { prop: "hoverable", desc: "悬浮效果", type: "boolean", default: "false" },
      ],
    },

    /* ---- Table ---- */
    Table: {
      name: "Table 表格", nameEn: "Table",
      desc: "展示结构化数据，支持排序、筛选、分页等交互。",
      category: "数据展示",
      demos: [
        { title: "基本用法", desc: "简单的表格，通过 columns 和 dataSource 配置。",
          preview: <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}><thead><tr style={{ borderBottom: "2px solid var(--color-border)" }}>{["Name","Age","Address"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, background: "var(--color-space-muted)" }}>{h}</th>)}</tr></thead><tbody>{[["John Brown",32,"New York"],["Jim Green",42,"London"],["Joe Black",32,"Sydney"]].map((r,i) => <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>{r.map((c,j) => <td key={j} style={{ padding: "10px 14px" }}>{c}</td>)}</tr>)}</tbody></table>,
          code: `const cols = [{title:'Name',dataIndex:'name'},{title:'Age',dataIndex:'age'}];\nconst data = [{name:'John',age:32},{name:'Jim',age:42}];\n<UiTable columns={cols} dataSource={data} />` },
      ],
      api: [
        { prop: "columns", desc: "列配置", type: "Column[]", default: "[]" },
        { prop: "dataSource", desc: "数据源", type: "object[]", default: "[]" },
        { prop: "loading", desc: "加载状态", type: "boolean", default: "false" },
        { prop: "pagination", desc: "分页配置", type: "object | false", default: "-" },
      ],
    },

    /* ---- Tag ---- */
    Tag: {
      name: "Tag 标签", nameEn: "Tag",
      desc: "进行标记和分类的小标签。用于标记事物的属性和维度。",
      category: "数据展示",
      demos: [
        { title: "基本用法", desc: "使用不同颜色的标签做标记。",
          preview: <DemoBox><Badge tone="default">Default</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="error">Error</Badge></DemoBox>,
          code: `<UiTag color="default">Default</UiTag>\n<UiTag color="success">Success</UiTag>\n<UiTag color="warning">Warning</UiTag>\n<UiTag color="error">Error</UiTag>` },
        { title: "可关闭标签", desc: "设置 closable 属性使标签可关闭。",
          preview: <DemoBox><span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(99,91,255,0.1)", color: "var(--color-neural)" }}>Tag 1<span style={{ cursor: "pointer", marginLeft: 2 }}>✕</span></span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(56,161,105,0.12)", color: "#22543D" }}>Tag 2<span style={{ cursor: "pointer", marginLeft: 2 }}>✕</span></span></DemoBox>,
          code: `<UiTag closable onClose={handleClose}>Tag 1</UiTag>` },
      ],
      api: [
        { prop: "color", desc: "标签色", type: "default | success | warning | error | string", default: "default" },
        { prop: "closable", desc: "是否可关闭", type: "boolean", default: "false" },
        { prop: "onClose", desc: "关闭回调", type: "(e) => void", default: "-" },
      ],
    },

    /* ---- Tooltip ---- */
    Tooltip: {
      name: "Tooltip 文字提示", nameEn: "Tooltip",
      desc: "简单的文字提示气泡框。鼠标悬停时显示，用于辅助说明。",
      category: "数据展示",
      demos: [
        { title: "基本用法", desc: "最简单的文字提示，悬停显示。",
          preview: <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ position: "relative", padding: "6px 14px", borderRadius: 6, background: "#18181B", color: "#fff", fontSize: 12 }}>Hover me<span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #18181B" }} /></span>
            <span style={{ position: "relative", padding: "6px 14px", borderRadius: 6, background: "#18181B", color: "#fff", fontSize: 12 }}>Top<span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #18181B" }} /></span>
          </div>,
          code: `<UiTooltip title="提示文字">\n  <span>Hover me</span>\n</UiTooltip>` },
        { title: "不同位置", desc: "支持 12 个方向。",
          preview: <div style={{ display: "grid", gridTemplateColumns: "repeat(3,80px)", gap: 8, justifyItems: "center" }}>
            {["TL","Top","TR","LT","","RT","BL","Bottom","BR"].map((p,i) => <span key={i} style={{ padding: "4px 10px", borderRadius: 4, background: p ? "var(--color-space-muted)" : "transparent", fontSize: 12, color: "var(--color-text-muted)", textAlign: "center" }}>{p || "·"}</span>)}
          </div>,
          code: `<UiTooltip title="提示" placement="topLeft">TL</UiTooltip>\n<UiTooltip title="提示" placement="top">Top</UiTooltip>\n...` },
      ],
      api: [
        { prop: "title", desc: "提示文字", type: "string | ReactNode", default: "-" },
        { prop: "placement", desc: "弹出位置", type: "top | bottom | left | right 及其组合", default: "top" },
      ],
    },

    /* ---- Progress ---- */
    Progress: {
      name: "Progress 进度条", nameEn: "Progress",
      desc: "展示操作的当前进度。用于加载、上传、下载等场景。",
      category: "数据展示",
      demos: [
        { title: "进度条", desc: "标准的进度条，设置 percent 属性即可。",
          preview: <div style={{ width: 300 }}><div style={{ height: 8, borderRadius: 999, background: "var(--color-space-muted)", overflow: "hidden", border: "1px solid var(--color-border)" }}><div style={{ width: "60%", height: "100%", borderRadius: 999, background: "var(--color-neural)", transition: "width 0.3s" }} /></div><span style={{ display: "block", fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>60%</span></div>,
          code: `<UiProgress percent={60} />` },
        { title: "进度条状态", desc: "进度条有正常、成功、异常三种状态。",
          preview: <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 8 }}>{[{ p: 100, c: "#38A169" },{ p: 50, c: "#D69E2E" },{ p: 30, c: "#E53E3E" }].map(({p,c}) => <div key={p} style={{ height: 8, borderRadius: 999, background: "var(--color-space-muted)", overflow: "hidden", border: "1px solid var(--color-border)" }}><div style={{ width: `${p}%`, height: "100%", borderRadius: 999, background: c, transition: "width 0.3s" }} /></div>)}</div>,
          code: `<UiProgress percent={100} status="success" />\n<UiProgress percent={50} status="warning" />\n<UiProgress percent={30} status="exception" />` },
      ],
      api: [
        { prop: "percent", desc: "百分比", type: "number", default: "0" },
        { prop: "type", desc: "类型", type: "line | circle | dashboard", default: "line" },
        { prop: "status", desc: "状态", type: "success | exception | warning | active", default: "-" },
      ],
    },

    /* ---- Alert ---- */
    Alert: {
      name: "Alert 警告提示", nameEn: "Alert",
      desc: "警告提示，展现需要关注的信息。用于页面中展示重要的提示信息。",
      category: "反馈",
      demos: [
        { title: "四种类型", desc: "共有 success、info、warning、error 四种类型。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 380 }}>
            <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(56,161,105,0.2)", background: "rgba(56,161,105,0.08)", fontSize: 13, color: "#22543D" }}>✓ Success: 操作成功完成</div>
            <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(99,91,255,0.15)", background: "rgba(99,91,255,0.06)", fontSize: 13, color: "var(--color-neural)" }}>ℹ Info: 这是一条普通信息</div>
            <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(214,158,46,0.2)", background: "rgba(214,158,46,0.08)", fontSize: 13, color: "#744210" }}>⚠ Warning: 请注意，可能存在风险</div>
            <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(229,62,62,0.2)", background: "rgba(229,62,62,0.08)", fontSize: 13, color: "#9B2C2C" }}>✗ Error: 操作失败，请重试</div>
          </div>,
          code: `<UiAlert type="success" message="操作成功完成" />\n<UiAlert type="info" message="这是一条普通信息" />\n<UiAlert type="warning" message="请注意，可能存在风险" />\n<UiAlert type="error" message="操作失败，请重试" />` },
        { title: "可关闭", desc: "设置 closable 属性显示关闭按钮。",
          preview: <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(99,91,255,0.15)", background: "rgba(99,91,255,0.06)", fontSize: 13, color: "var(--color-neural)", display: "flex", justifyContent: "space-between", alignItems: "center", width: 380 }}><span>ℹ 可关闭的提示信息</span><span style={{ cursor: "pointer", fontSize: 16, color: "var(--color-text-muted)" }}>✕</span></div>,
          code: `<UiAlert type="info" message="提示信息" closable onClose={fn} />` },
      ],
      api: [
        { prop: "type", desc: "提示类型", type: "success | info | warning | error", default: "info" },
        { prop: "message", desc: "提示内容", type: "string | ReactNode", default: "-" },
        { prop: "closable", desc: "是否可关闭", type: "boolean", default: "false" },
        { prop: "onClose", desc: "关闭回调", type: "() => void", default: "-" },
      ],
    },

    /* ---- Dialog ---- */
    Dialog: {
      name: "Dialog 对话框", nameEn: "Dialog",
      desc: "模态对话框。用于重要信息告知或操作确认，会中断用户操作。",
      category: "反馈",
      demos: [
        { title: "基本用法", desc: "基础的对话框，包含标题、内容和操作按钮。",
          preview: <div style={{ padding: 24, borderRadius: 14, border: "1px solid var(--color-border)", background: "#fff", width: 320, textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}><h4 style={{ margin: "0 0 8px", fontSize: 16 }}>对话框标题</h4><p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>这是对话框的内容描述，用于向用户确认重要操作。</p><div style={{ display: "flex", gap: 8, justifyContent: "center" }}><Btn variant="default">取消</Btn><Btn>确认</Btn></div></div>,
          code: `<UiDialog title="对话框标题" visible={open} onOk={handleOk} onCancel={handleCancel}>\n  <p>这是对话框的内容...</p>\n</UiDialog>` },
        { title: "确认对话框", desc: "使用 confirm 方法快速弹出确认对话框。",
          preview: <div style={{ padding: 20, borderRadius: 14, border: "1px solid var(--color-border)", background: "#fff", width: 300, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}><div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}><span style={{ fontSize: 20 }}>⚠</span><div><h4 style={{ margin: "0 0 6px", fontSize: 15 }}>确认删除此项？</h4><p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--color-text-muted)" }}>此操作不可撤销</p><div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><Btn size="sm" variant="default">取消</Btn><Btn size="sm" variant="primary">确认</Btn></div></div></div></div>,
          code: `UiDialog.confirm({\n  title: '确认删除此项？',\n  content: '此操作不可撤销',\n  onOk() { ... },\n});` },
      ],
      api: [
        { prop: "title", desc: "标题", type: "string | ReactNode", default: "-" },
        { prop: "visible", desc: "是否可见", type: "boolean", default: "false" },
        { prop: "onOk", desc: "确认回调", type: "(e) => void", default: "-" },
        { prop: "onCancel", desc: "取消回调", type: "(e) => void", default: "-" },
      ],
    },

    /* ---- Loading ---- */
    Loading: {
      name: "Loading 加载中", nameEn: "Loading",
      desc: "用于页面和区块的加载中状态。给予用户适当的操作反馈。",
      category: "反馈",
      demos: [
        { title: "基本用法", desc: "简单的加载指示器。",
          preview: <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--color-text-muted)" }}><Spinner /> 加载中...</div>
            <div style={{ display: "flex", gap: 16 }}>{[24,36,48].map(s => <span key={s} style={{ width: s, height: s, borderRadius: "50%", border: "3px solid var(--color-border)", borderTopColor: "var(--color-neural)", display: "inline-block", animation: "spin 0.75s linear infinite" }} />)}</div>
          </div>,
          code: `<UiLoading />\n<UiLoading size="large" />` },
        { title: "容器内加载", desc: "将 loading 嵌入到容器中，覆盖内容。",
          preview: <div style={{ position: "relative", width: 280, height: 120, borderRadius: 12, border: "1px solid var(--color-border)", background: "#fff", overflow: "hidden" }}><div style={{ padding: 16, opacity: 0.3 }}><div style={{ height: 14, background: "var(--color-space-muted)", borderRadius: 4, width: "70%", marginBottom: 8 }} /><div style={{ height: 14, background: "var(--color-space-muted)", borderRadius: 4, width: "50%" }} /></div><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.6)" }}><Spinner /></div></div>,
          code: `<UiCard loading>\n  <p>卡片内容</p>\n</UiCard>` },
      ],
      api: [
        { prop: "loading", desc: "是否加载中", type: "boolean", default: "true" },
        { prop: "size", desc: "尺寸", type: "small | default | large", default: "default" },
        { prop: "tip", desc: "加载提示文字", type: "string", default: "-" },
      ],
    },
  };
}

const _cache: Record<string, ComponentDoc> = {};
export function getComponentDoc(nameEn: string): ComponentDoc | undefined {
  if (!_cache[nameEn]) {
    const docs = getDocs();
    _cache[nameEn] = docs[nameEn] ?? {
      name: nameEn, nameEn, desc: "",
      category: "通用",
      demos: [{ title: "基本用法", desc: `${nameEn} 组件。`, preview: <div style={{ padding: 16, textAlign: "center", color: "var(--color-text-muted)", fontSize: 14 }}>{nameEn} 组件演示</div>, code: `import { Ui${nameEn} } from "@/components/ui";\n\n<Ui${nameEn} />` }],
      api: [],
    };
  }
  return _cache[nameEn];
}
