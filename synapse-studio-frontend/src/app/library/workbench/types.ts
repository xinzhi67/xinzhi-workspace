export type LibraryItemId =
  | "intro"
  | "container"
  | "stack"
  | "grid"
  | "divider"
  | "layout-presets"
  | "button"
  | "text"
  | "badge"
  | "avatar"
  | "link"
  | "breadcrumb"
  | "label"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "alert"
  | "confirm-modal"
  | "spinner"
  | "progress"
  | "tabs"
  | "card"
  | "empty";

export type LibraryMenuItem = {
  id: LibraryItemId;
  label: string;
};

export type LibraryMenuGroup = {
  id: string;
  label: string;
  items: LibraryMenuItem[];
};
