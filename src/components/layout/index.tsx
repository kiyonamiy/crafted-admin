import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";

import Content from "./content";
import Header from "./header";
import styles from "./index.module.less";
import Sider from "./sider";

const Layout = () => {
  return (
    <AntLayout className={styles.layout}>
      {/* 左侧 导航 */}
      <Sider />
      {/* 右侧 内容 */}
      <AntLayout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
