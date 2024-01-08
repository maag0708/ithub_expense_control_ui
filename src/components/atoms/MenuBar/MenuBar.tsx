import React from "react";
import { MenuBarProps } from "./MenuBar.types";
import { Menubar as PiMenuBar } from "primereact/menubar";

const MenuBar: React.FC<MenuBarProps> = ({ items, start, end }) => {
  return (
    <div className="card">
      <PiMenuBar model={items} start={start} end={end} />
    </div>
  );
};

export default MenuBar;
