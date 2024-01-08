import React from "react";
import { LayoutProps } from "./Layout.types";
import MenuBar from "../atoms/MenuBar/MenuBar";
import Sidebar from "../atoms/Sidebar/Sidebar";
import SideBarItemRender from "../hocs/SideBarRender/SideBarRender";
import { SidebarItem } from "../../types/sidebar";
import { MenuBarItem } from "../../types/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const items: SidebarItem[] = [
    {
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          template: SideBarItemRender,
        },
        {
          label: "Messages",
          icon: "pi pi-inbox",
          template: SideBarItemRender,
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          template: SideBarItemRender,
        },
      ],
    },
  ];

  const itemsMenuBar: MenuBarItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="flex flex-column h-screen">
      <MenuBar items={itemsMenuBar} start={start} end={end} />
      <div className="flex flex-row h-full">
        <Sidebar items={items} />
        <div className="w-full m-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
