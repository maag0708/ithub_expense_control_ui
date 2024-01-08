import React from "react";
import { DialogProps } from "./Dialog.types";
import { Dialog as PiDialoga } from "primereact/dialog";

const Dialog: React.FC<DialogProps> = ({
  visible,
  header,
  footer,
  children,
  onHide,
}) => {
  return <>{children}</>;
};

export default Dialog;
