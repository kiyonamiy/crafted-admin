import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Dropdown,
  Layout as AntLayout,
  MenuProps,
  Spin,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { QueryKeyEnum } from "@/constants/query-key";
import { RoutePathEnum } from "@/constants/route-path";
import * as BaseService from "@/services/base";
import * as UserService from "@/services/user";
import { generateColorFromString } from "@/utils";
import { LocalStorageUtils } from "@/utils/local-storage";

import styles from "./index.module.less";

const Header: React.FC = () => {
  const {
    token: { colorBgContainer, paddingContentHorizontal },
  } = theme.useToken();

  const navigate = useNavigate();

  const { data: userInfo, status } = useQuery({
    queryKey: [QueryKeyEnum.GET_USER_INFO],
    queryFn: UserService.getUserInfo,
  });

  const nickName = userInfo?.nickName ?? "";

  const items: MenuProps["items"] = [
    {
      key: "personal-information",
      label: "个人信息",
      onClick: () => {
        navigate(RoutePathEnum.PERSONAL_INFORMATION.path);
      },
    },
    {
      key: "logout",
      label: "退出登录",
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: async () => {
        await BaseService.logout();
        LocalStorageUtils.removeItem(LocalKeyEnum.LOGIN_RESULT);
        LocalStorageUtils.removeItem(LocalKeyEnum.PERMISSIONS);
        navigate(RoutePathEnum.ROOT.path);
      },
    },
  ];

  return (
    <AntLayout.Header
      className={styles.header}
      style={{
        backgroundColor: colorBgContainer,
        padding: `0 ${paddingContentHorizontal}px`,
      }}
    >
      <Spin spinning={status === "loading"}>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{
              backgroundColor: generateColorFromString(nickName),
              verticalAlign: "middle",
            }}
            size="default"
          >
            {nickName.slice(0, 1)}
          </Avatar>
        </Dropdown>
      </Spin>
    </AntLayout.Header>
  );
};

export default Header;
