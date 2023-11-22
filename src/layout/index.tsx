import "./index.less";

import { Outlet } from "react-router-dom";

import Breadcrumb from "./breadcrumb";
import Content from "./content";
import Header from "./header";
import Logo from "./logo";
import Menu from "./menu";
import Sider from "./sider";
import CollapsedButton from "./sider-collapsed-btn";

const Layout = () => {
  return (
    <div className="layout-container">
      <Sider>
        <Logo />
        <Menu />
        <CollapsedButton />
      </Sider>
      <div className="layout__main">
        <Header />
        <Breadcrumb />
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default Layout;
