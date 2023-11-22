import { Menu as AntdMenu } from "antd";

import { useSiderContext } from "../sider";
import { useMenuItems } from "./hooks/menu-items";
import { useMenuKey } from "./hooks/menu-key";

const Menu = () => {
  const { selectedKeys, openKeys, onOpenChange } = useMenuKey();
  const menuItems = useMenuItems();

  const { collapsed } = useSiderContext();

  return (
    <AntdMenu
      className="layout__menu"
      mode="inline"
      items={menuItems}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      inlineCollapsed={collapsed}
    />
  );
};

export default Menu;
