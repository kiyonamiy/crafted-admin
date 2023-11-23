import { App, Avatar, Dropdown, MenuProps, Spin } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteObjectEnum } from "@/constants/route-object";
import { useUserInfoQuery } from "@/hooks/query";
import { generateColorFromString } from "@/utils";
import { LocalStorageUtils } from "@/utils/local-storage";

import { useServices } from "../hooks/services";

const Header = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const { logoutMutation } = useServices();
  const userInfoQuery = useUserInfoQuery();

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
    [logoutMutation, message, navigate],
  );

  console.log(userInfoQuery.status);

  return (
    <div className="layout__header">
      {}
      {userInfoQuery.data != null ? (
        <Dropdown menu={{ items }}>
          <div className="avatar-container">
            <Avatar
              style={{
                backgroundColor: generateColorFromString(
                  userInfoQuery.data.name,
                ),
                verticalAlign: "middle",
              }}
              size="small"
            >
              {userInfoQuery.data.name.slice(0, 1)}
            </Avatar>
            <span>{userInfoQuery.data.name}</span>
          </div>
        </Dropdown>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Header;
