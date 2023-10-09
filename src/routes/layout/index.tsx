import { Layout as AntLayout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Content from "./content";
import Header from "./header";
import styles from "./index.module.less";
import Sider from "./sider";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntLayout className={styles.layout}>
      {/* 左侧 导航 */}
      <Sider collapsed={collapsed} />
      {/* 右侧 内容 */}
      <AntLayout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
