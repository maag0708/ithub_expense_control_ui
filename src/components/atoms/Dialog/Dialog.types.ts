import React from "react";

export interface DialogProps {
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onHide: () => void;
}
