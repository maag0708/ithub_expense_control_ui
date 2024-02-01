import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuBarItem } from "../../types/menubar";
import { SidebarItemModel } from "../../types/sidebar";
import { removeLocalStorage } from "../../utils/localStorage";
import Alert from "../atoms/Alert/Alert";
import MenuBar from "../atoms/MenuBar/MenuBar";
import Sidebar from "../atoms/Sidebar/Sidebar";
import SideBarItemRender from "../molecules/Layout/SideBarRender/SideBarRender";
import { LayoutProps } from "./Layout.types";
import { selectRoleName } from "../../state/userSlice";
import { useSelector } from "react-redux";

const Layout: React.FC<LayoutProps> = ({ header, title, children, back }) => {
  const navigate = useNavigate();
  const role = useSelector(selectRoleName);
  const items: SidebarItemModel[] = [
    {
      label: "Dashboard",
      className: "text-primary bg-blue-50 active",
      items: [
        {
          label: "Facturas",
          icon: "pi pi-fw pi-file",
          template: SideBarItemRender,
          url: "/invoices",
          visible: role === "ADMIN",
        },
        {
          label: "Servicios",
          icon: "pi pi-fw pi-send",
          template: SideBarItemRender,
          url: "/services",
        },
      ],
    },
  ];

  const itemsMenuBar: MenuBarItem[] = [
    {
      label: "Facturas",
      icon: "pi pi-fw pi-file",
      template: SideBarItemRender,
      url: "/invoices",
      visible: role === "ADMIN",
    },
    {
      label: "Servicios",
      icon: "pi pi-fw pi-send",
      template: SideBarItemRender,
      url: "/services",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="http://farmaciasroma.centralus.cloudapp.azure.com:8007/assets/images/roma_logo-1.png"
      height="60"
      className="mr-2 hidden md:block"
    />
  );

  const handleLogout = () => {
    removeLocalStorage("user");
    window.location.href = "/";
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
    <div className="flex flex-column h-screen w-screen bg-blue-50 overflow-auto lg:overflow-hidden">
      <Alert />
      <MenuBar items={itemsMenuBar} start={start} end={end} />
      <div className="flex flex-row h-full w-screen">
        <div className="flex-1 overflow-auto lg:overflow-hidden">
          <div className="flex flex-column justify-between h-full max-h-full">
            <div className="flex flex-column md:flex-row justify-content-between px-5">
              <div className="w-full flex flex-row justify-content-start align-items-center gap-3 h-4rem">
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
              <div className="w-full flex flex-column md:flex-row align-items-center justify-content-end my-2">
                {header}
              </div>
            </div>
            <div 
            style={{height: "calc(100% - 4rem)"}}
            className="mx-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
