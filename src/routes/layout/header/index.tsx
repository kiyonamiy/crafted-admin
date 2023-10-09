import * as Icons from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Layout as AntLayout, Spin, theme } from "antd";

import { QueryKeyEnum } from "@/constants/query-key";
import * as UserService from "@/services/user";
import { generateColorFromString } from "@/utils";

import styles from "./index.module.less";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { collapsed, setCollapsed } = props;
  const {
    token: { colorBgContainer, paddingContentHorizontal },
  } = theme.useToken();

  const { data: userInfo, status } = useQuery({
    queryKey: [QueryKeyEnum.GET_USER_INFO],
    queryFn: UserService.getUserInfo,
  });

  const nickName = userInfo?.nickName ?? "";

  return (
    <AntLayout.Header
      className={styles.header}
      style={{
        backgroundColor: colorBgContainer,
        padding: `0 ${paddingContentHorizontal}px`,
      }}
    >
      <Button
        type="text"
        icon={
          collapsed ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />
        }
        onClick={() => setCollapsed(!collapsed)}
      />
      <Spin spinning={status === "loading"}>
        <Avatar
          style={{
            backgroundColor: generateColorFromString(nickName),
            verticalAlign: "middle",
          }}
          size="default"
        >
          {nickName.slice(0, 1)}
        </Avatar>
      </Spin>
    </AntLayout.Header>
  );
};

export default Header;
