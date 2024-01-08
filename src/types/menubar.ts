export interface MenuBarItem {
    label: string;
    icon?: string;
    badge?: number;
    template?: React.ReactNode;
    items?: MenuBarItems[];
}

export interface MenuBarItems {
    label: string;
    icon?: string;
    shortcut?: string;
    template?: React.ReactNode;
}
