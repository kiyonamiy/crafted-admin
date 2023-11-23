import { App, Avatar, Dropdown, MenuProps, Spin } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteObjectEnum } from "@/constants/route-object";
import { LocalStorageUtils } from "@/utils/local-storage";

import { useServices } from "../hooks/services";

const Header = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const { logoutMutation } = useServices();

  const name = "hello world";

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "personal-information",
        label: "个人信息",
        onClick: () => {
          navigate(RouteObjectEnum.PERSONAL_INFORMATION.path);
        },
      },
      {
        key: "logout",
        label: "退出登录",
        onClick: () => {
          void logoutMutation.mutateAsync().then(() => {
            LocalStorageUtils.removeItem(LocalKeyEnum.LOGIN_RESULT);
            LocalStorageUtils.removeItem(LocalKeyEnum.PERMISSIONS);
            void message.success("退出登录成功");
            navigate(RouteObjectEnum.LOGIN.path);
          });
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name],
  );

  if (status === "loading") {
    return <Spin />;
  }

  return (
    <div className="layout__header">
      <Dropdown menu={{ items }}>
        <div className="avatar-container">
          <Avatar
            style={{
              // backgroundColor: generateColorFromString(name), // TODO
              verticalAlign: "middle",
            }}
            size="small"
          >
            {name.slice(0, 1)}
          </Avatar>
          <span>{name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
