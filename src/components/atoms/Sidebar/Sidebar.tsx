import React from "react";
import { SidebarProps } from "./Sidebar.types";
import { Menu } from "primereact/menu";

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="card hidden md:flex justify-content-start h-full">
      <Menu model={items} className="w-full md:w-13rem bg-blue-50" />
    </div>
  );
};

export default Sidebar;
