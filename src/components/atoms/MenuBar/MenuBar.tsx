import React from "react";
import { MenuBarProps } from "./MenuBar.types";
import { Menubar as PiMenuBar } from "primereact/menubar";

const MenuBar: React.FC<MenuBarProps> = ({ items, start, end }) => {
  return (
    <PiMenuBar className="bg-blue-50 w-screen" model={items} start={start} end={end} />
  );
};

export default MenuBar;
