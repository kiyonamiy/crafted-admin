import * as Icons from "@ant-design/icons";
import { Button, Layout as AntLayout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// import styles from "./index.module.less";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <AntLayout>
      <AntLayout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", maxHeight: "100vh", overflow: "scroll" }}
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
      <AntLayout>
        <AntLayout.Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <Icons.MenuUnfoldOutlined />
              ) : (
                <Icons.MenuFoldOutlined />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </AntLayout.Header>
        <AntLayout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  );
};
