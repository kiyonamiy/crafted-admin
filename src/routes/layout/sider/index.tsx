import * as Icons from "@ant-design/icons";
import { Layout as AntLayout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.less";

interface SiderProps {
  collapsed: boolean;
}

const Sider: React.FC<SiderProps> = (props: SiderProps) => {
  const { collapsed } = props;
  const navigate = useNavigate();
  return (
    <AntLayout.Sider
      className={styles.sider}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <Icons.UserOutlined />,
            label: "个人信息",
            onClick: () => {
              navigate("/user/personal-information");
            },
          },
          {
            key: "2",
            icon: <Icons.VideoCameraOutlined />,
            label: "角色管理",
            onClick: () => {
              navigate("/user/role-management");
            },
          },
        ]}
      />
    </AntLayout.Sider>
  );
};

export default Sider;
