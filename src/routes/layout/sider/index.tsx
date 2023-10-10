import { Layout as AntLayout, Menu } from "antd";

import { useMenuItems } from "./hooks/menu-items";
import { useMenuKey } from "./hooks/menu-key";
import styles from "./index.module.less";

const Sider: React.FC = () => {
  const menuItems = useMenuItems();
  const { selectedKeys, openKeys } = useMenuKey();

  return (
    <AntLayout.Sider
      className={styles.sider}
      trigger={null}
      collapsible
      // collapsed={collapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
      />
    </AntLayout.Sider>
  );
};

export default Sider;
