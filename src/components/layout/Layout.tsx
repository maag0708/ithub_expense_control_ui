import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuBarItem } from "../../types/menubar";
import { SidebarItemModel } from "../../types/sidebar";
import Alert from "../atoms/Alert/Alert";
import MenuBar from "../atoms/MenuBar/MenuBar";
import Sidebar from "../atoms/Sidebar/Sidebar";
import MenuBarRender from "../molecules/Layout/MenuBarRender/MenuBarRender";
import SideBarItemRender from "../molecules/Layout/SideBarRender/SideBarRender";
import { LayoutProps } from "./Layout.types";
import { Badge } from "primereact/badge";
import { removeLocalStorage } from "../../utils/localStorage";

const Layout: React.FC<LayoutProps> = ({ header, title, children, back }) => {
  const navigate = useNavigate();

  const items: SidebarItemModel[] = [
    {
      label: "Dashboard",
      className: "text-primary bg-blue-50 active",
      items: [
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          template: SideBarItemRender,
          url: "/",
        },
        {
          label: "Facturas",
          icon: "pi pi-fw pi-file",
          template: SideBarItemRender,
          url: "/invoices",
        },
        {
          label: "Servicios",
          icon: "pi pi-fw pi-file",
          template: SideBarItemRender,
          url: "/services",
        },
      ],
    },
  ];

  const itemsMenuBar: MenuBarItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      template: MenuBarRender,
      url: "/",
    },
    {
      label: "Facturas",
      icon: "pi pi-fw pi-file",
      template: SideBarItemRender,
      url: "/invoices",
    },
    {
      label: "Servicios",
      icon: "pi pi-fw pi-file",
      template: SideBarItemRender,
      url: "/services",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="60"
      className="mr-2"
    ></img>
  );

  const handleLogout = () => {
    removeLocalStorage('user');
    window.location.href = '/';
  };

  const end = (
    <div className="p-menuitem-content">
      <Button
        icon="pi pi-sign-out"
        raised
        text
        className="p-button-rounded p-mr-2"
        onClick={handleLogout}
      />
    </div>
  );

  return (
    <div className="flex flex-column h-screen w-screen bg-blue-50">
      <Alert />
      <MenuBar items={itemsMenuBar} start={start} end={end} />
      <div className="flex flex-row h-full w-screen">
        <Sidebar items={items} />
        <div className="flex-1 overflow-auto lg:overflow-hidden m-3">
          <div className="flex flex-column justify-between h-full max-h-full">
            <div className="flex flex-column md:flex-row justify-content-between px-0 md:px-5">
              <div className="w-full flex flex-row justify-content-start align-items-center gap-3 ">
                {back && (
                  <Button
                    icon="pi pi-arrow-left"
                    text
                    className="p-button-rounded p-mr-2"
                    onClick={() => navigate(back)}
                  />
                )}
                <h1 className="text-xl md:text-3xl font-normal text-primary text-center md:text-left my-4">
                  {title}
                </h1>
              </div>
              <div className="w-full flex flex-column md:flex-row align-items-center justify-content-end">
                {header}
              </div>
            </div>
            <div className="flex flex-column px-0 md:px-5 gap-2 h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
