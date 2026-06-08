import type { LibraryItemId, LibraryMenuGroup } from "./types";

export const LIBRARY_MENU: LibraryMenuGroup[] = [
  {
    id: "start",
    label: "开始",
    items: [{ id: "intro", label: "概述" }],
  },
  {
    id: "layout",
    label: "布局",
    items: [
      { id: "layout-presets", label: "布局预设" },
      { id: "container", label: "Container" },
      { id: "stack", label: "Stack" },
      { id: "grid", label: "Grid" },
      { id: "divider", label: "Divider" },
    ],
  },
  {
    id: "general",
    label: "通用",
    items: [
      { id: "button", label: "Button" },
      { id: "text", label: "Text" },
    ],
  },
  {
    id: "data",
    label: "数据展示",
    items: [
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "link", label: "Link" },
      { id: "breadcrumb", label: "Breadcrumb" },
    ],
  },
  {
    id: "entry",
    label: "数据录入",
    items: [
      { id: "label", label: "Label" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "RadioGroup" },
      { id: "switch", label: "Switch" },
    ],
  },
  {
    id: "feedback",
    label: "反馈",
    items: [
      { id: "alert", label: "Alert" },
      { id: "confirm-modal", label: "确认弹窗" },
      { id: "spinner", label: "Spinner" },
      { id: "progress", label: "Progress" },
    ],
  },
  {
    id: "nav",
    label: "导航",
    items: [{ id: "tabs", label: "Tabs" }],
  },
  {
    id: "misc",
    label: "其他",
    items: [
      { id: "card", label: "Card" },
      { id: "empty", label: "Empty" },
    ],
  },
];

export const DEFAULT_LIBRARY_ID: LibraryItemId = "intro";

export const ALL_LIBRARY_IDS: LibraryItemId[] = LIBRARY_MENU.flatMap((g) =>
  g.items.map((i) => i.id),
);

export function parseLibraryId(raw: string | undefined): LibraryItemId {
  if (raw && ALL_LIBRARY_IDS.includes(raw as LibraryItemId)) {
    return raw as LibraryItemId;
  }
  return DEFAULT_LIBRARY_ID;
}
