import section from "../page-section.module.css";
import { LibraryWorkbench } from "./workbench/LibraryWorkbench";

export default function LibraryPage() {
  return (
    <>
      <h1 className={section.title}>组件库</h1>
      <p className={section.subtitle}>
        <code>@/components/ui</code> 仅使用{" "}
        <strong>原生 HTML + 各组件独立 CSS Module</strong>（<code>Ui*.tsx</code> 与 <code>Ui*.module.css</code> 成对）。下方工作台为单组件浏览：左侧目录可收起，中间为可点击演示、状态矩阵与可复制示例代码；URL{" "}
        <code>?c=button</code> 可分享直达。
      </p>

      <LibraryWorkbench />
    </>
  );
}
