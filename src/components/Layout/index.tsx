import { Outlet } from "react-router-dom";

import styles from "./index.module.less";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSider}>sider</div>
      <div className={styles.rightContent}>
        <Outlet />
      </div>
    </div>
  );
};
