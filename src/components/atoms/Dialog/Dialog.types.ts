export interface DialogProps {
  title?: string;
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onHide: () => void;
  className?: string;
}
