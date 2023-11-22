import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { useSiderContext } from "../sider";

const CollapsedButton = () => {
  const { collapsed, setCollapsed } = useSiderContext();

  return (
    <div
      className="collapsed-button"
      onClick={() => setCollapsed?.(!collapsed)}
    >
      {collapsed ? (
        <MenuUnfoldOutlined className="collapsed-button__icon" />
      ) : (
        <MenuFoldOutlined className="collapsed-button__icon" />
      )}
    </div>
  );
};

export default CollapsedButton;
