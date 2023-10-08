import { Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import styles from "./index.module.less";

export const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.leftSider}>
        sider
        <Button
          onClick={() => {
            navigate("/user/role-management");
          }}
        >
          角色管理
        </Button>
        <Button
          onClick={() => {
            navigate("/user/personal-information");
          }}
        >
          个人信息
        </Button>
      </div>
      <div className={styles.rightContent}>
        <Outlet />
      </div>
    </div>
  );
};
