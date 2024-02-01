import { MenuItem, MenuItemOptions } from "primereact/menuitem";

export interface SidebarItemModel extends MenuItem{
  label?: string;
  items: MenuItemModel[]; 
}

export interface MenuItemModel {
  icon?: string;
  badge?: number;
  shortcut?: string;
  label: string;
  url: string;
  visible?: boolean;
  template?:
    | React.ReactNode
    | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);
}
