"use client";

import { useMemo, useState } from "react";
import { UiCard } from "@/components/ui";
import { CATEGORIES, getComponentDoc, type ApiRow } from "./component-data";
import styles from "./library.module.css";

const COMPONENTS = [
  { name: "Button 按钮", nameEn: "Button", desc: "按钮用于开始一个即时操作。标记了一个操作命令，响应用户点击行为触发相应的业务逻辑。", category: "通用" },
  { name: "Icon 图标", nameEn: "Icon", desc: "语义化的矢量图形。", category: "通用" },
  { name: "Divider 分割线", nameEn: "Divider", desc: "区隔内容的分割线。", category: "布局" },
  { name: "Grid 栅格", nameEn: "Grid", desc: "24 栅格系统。", category: "布局" },
  { name: "Space 间距", nameEn: "Space", desc: "设置组件之间的间距。", category: "布局" },
  { name: "Breadcrumb 面包屑", nameEn: "Breadcrumb", desc: "显示当前页面在系统层级结构中的位置。", category: "导航" },
  { name: "Dropdown 下拉菜单", nameEn: "Dropdown", desc: "向下弹出的菜单列表。", category: "导航" },
  { name: "Pagination 分页", nameEn: "Pagination", desc: "采用分页的形式分隔长列表。", category: "导航" },
  { name: "Steps 步骤条", nameEn: "Steps", desc: "引导用户按照流程完成任务。", category: "导航" },
  { name: "Tabs 标签页", nameEn: "Tabs", desc: "选项卡切换组件。", category: "导航" },
  { name: "Checkbox 复选框", nameEn: "Checkbox", desc: "在一组可选项中进行多项选择。", category: "数据录入" },
  { name: "Input 输入框", nameEn: "Input", desc: "通过鼠标或键盘输入内容。", category: "数据录入" },
  { name: "Radio 单选框", nameEn: "Radio", desc: "用于在多个备选项中选中单个状态。", category: "数据录入" },
  { name: "Select 选择器", nameEn: "Select", desc: "从一组数据中选择一个或多个选项。", category: "数据录入" },
  { name: "Switch 开关", nameEn: "Switch", desc: "切换单个布尔状态。", category: "数据录入" },
  { name: "Textarea 文本域", nameEn: "Textarea", desc: "用于多行文本输入。", category: "数据录入" },
  { name: "Card 卡片", nameEn: "Card", desc: "承载信息与操作的容器。", category: "数据展示" },
  { name: "Table 表格", nameEn: "Table", desc: "展示结构化数据。", category: "数据展示" },
  { name: "Tag 标签", nameEn: "Tag", desc: "进行标记和分类的小标签。", category: "数据展示" },
  { name: "Tooltip 文字提示", nameEn: "Tooltip", desc: "鼠标悬停时显示的提示文字。", category: "数据展示" },
  { name: "Progress 进度条", nameEn: "Progress", desc: "展示操作的当前进度。", category: "数据展示" },
  { name: "Alert 警告提示", nameEn: "Alert", desc: "警告提示，展现需要关注的信息。", category: "反馈" },
  { name: "Dialog 对话框", nameEn: "Dialog", desc: "模态对话框。", category: "反馈" },
  { name: "Loading 加载中", nameEn: "Loading", desc: "用于页面和区块的加载中状态。", category: "反馈" },
];

export default function LibraryPage() {
  const [activeComponent, setActiveComponent] = useState(COMPONENTS[0]);
  const [search, setSearch] = useState("");
  const [expandedCodes, setExpandedCodes] = useState<Record<number, boolean>>({});

  const toggleCode = (idx: number) => {
    setExpandedCodes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return COMPONENTS;
    const q = search.trim().toLowerCase();
    return COMPONENTS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || c.category.includes(q),
    );
  }, [search]);

  const doc = getComponentDoc(activeComponent.nameEn);
  const api = doc?.api ?? [];

  return (
    <div className={styles.workspace}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSearch}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className={styles.sidebarSearchInput} placeholder="搜索组件..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sidebarNav}>
          {CATEGORIES.map((cat) => {
            const catComponents = filtered.filter((c) => c.category === cat);
            if (catComponents.length === 0) return null;
            return (
              <div key={cat} className={styles.navGroup}>
                <span className={styles.navGroupLabel}>{cat}</span>
                {catComponents.map((c) => (
                  <button
                    key={c.name}
                    className={`${styles.navItem} ${activeComponent.name === c.name ? styles.navItemActive : ""}`}
                    onClick={() => setActiveComponent(c)}
                  >
                    {c.nameEn}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.doc}>
          {/* Header */}
          <h1 className={styles.docTitle}>{activeComponent.name}</h1>
          <p className={styles.docDesc}>{activeComponent.desc}</p>

          {/* Demo Sections */}
          {doc && doc.demos.map((demo, idx) => (
            <div key={idx} className={styles.demoSection}>
              <h2 className={styles.demoTitle}>{demo.title}</h2>
              <p className={styles.demoDesc}>{demo.desc}</p>

              <UiCard className={styles.demoPreview}>
                {demo.preview}
              </UiCard>

              <div className={styles.codeBlock}>
                <div className={styles.codeBar} onClick={() => toggleCode(idx)}>
                  <span className={styles.codeBarIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </span>
                  <span>Code</span>
                  <span className={styles.codeBarArrow} style={{ transform: expandedCodes[idx] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                </div>
                {expandedCodes[idx] && (
                  <pre className={styles.codePre}><code>{demo.code}</code></pre>
                )}
              </div>
            </div>
          ))}

          {/* API */}
          {api.length > 0 && (
            <div className={styles.demoSection}>
              <h2 className={styles.demoTitle}>API</h2>
              <UiCard className={styles.apiCard}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr>
                  </thead>
                  <tbody>
                    {api.map((row: ApiRow) => (
                      <tr key={row.prop}>
                        <td><strong>{row.prop}</strong></td>
                        <td>{row.desc}</td>
                        <td><code>{row.type}</code></td>
                        <td><code>{row.default}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </UiCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
