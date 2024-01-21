import { Badge } from "primereact/badge";
import { Link } from "react-router-dom";

const SideBarItemRender = (item: any) => (
  <Link to={item.url} className="flex align-items-center p-menuitem-link">
    <span className={item.icon} />
    <span className="mx-2">{item.label}</span>
    {item.badge && <Badge className="ml-auto" value={item.badge} />}
    {item.shortcut && (
      <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
        {item.shortcut}
      </span>
    )}
  </Link>
);

export default SideBarItemRender;
