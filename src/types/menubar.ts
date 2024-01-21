import { MenuItem, MenuItemOptions } from "primereact/menuitem";

export interface MenuBarItem {
  label: string;
  icon?: string;
  badge?: number;
  url: string;
  template?:
    | React.ReactNode
    | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);
  items?: MenuBarItems[];
}

export interface MenuBarItems {
  label: string;
  icon?: string;
  shortcut?: string;
  url: string;
  template?:
  | React.ReactNode
  | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);
}
