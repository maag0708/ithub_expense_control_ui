import { MenuItem, MenuItemOptions } from "primereact/menuitem";

export interface SidebarItem extends MenuItem {
  label?: string;
  items: MenuItemModel[];
}

interface MenuItemModel {
  icon?: string;
  badge?: number;
  shortcut?: string;
  label: string;
  template?:
    | React.ReactNode
    | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);
}
