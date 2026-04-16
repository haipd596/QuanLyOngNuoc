export interface AppMenuItem {
  key: string;
  path?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  children?: AppMenuItem[];
  level?: number;
  badge?: number;
  hidden?: boolean;
  show?: boolean;
  /** Nếu true, search params sẽ được lưu/khôi phục qua sessionStorage khi điều hướng */
  haveSearch?: boolean;
}
export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  menuItems?: AppMenuItem[];
  title?: string;
}
