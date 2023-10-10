import * as Icons from "@ant-design/icons";
import React from "react";

import { PermissionCodeEnum } from "@/constants/permission";

// eslint-disable-next-line react-refresh/only-export-components
export enum RouteKeyEnum {
  LOGIN = "LOGIN",

  ROOT = "ROOT",
  USER = "USER",
  PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
  ROLE_MANAGEMENT = "ROLE_MANAGEMENT",
  PAGE_404 = "PAGE_404",
}

export interface RoutePath {
  path: string;
  description: string;
  permissionCodes?: string[];
  parentKey?: RouteKeyEnum;
  // 作为菜单
  menu?: {
    // key 为对应的 RouteKeyEnum，不做显式声明
    icon?: React.ReactNode;
  };
}

export const RoutePathEnum: Record<RouteKeyEnum, RoutePath> = {
  [RouteKeyEnum.LOGIN]: {
    path: "/login",
    description: "登录页",
  },
  [RouteKeyEnum.ROOT]: {
    path: "/",
    description: "根路由",
  },
  [RouteKeyEnum.USER]: {
    path: "/user",
    description: "账户中心",
    parentKey: RouteKeyEnum.ROOT,
    menu: {
      icon: <Icons.HomeOutlined />,
    },
  },
  [RouteKeyEnum.PERSONAL_INFORMATION]: {
    path: "/user/personal-information",
    permissionCodes: [PermissionCodeEnum.USER.DETAIL],
    description: "个人信息",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.ROLE_MANAGEMENT]: {
    path: "/user/role-management",
    permissionCodes: [PermissionCodeEnum.USER.ROLE_LIST],
    description: "角色管理",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.PAGE_404]: {
    path: "*",
    description: "404",
    parentKey: RouteKeyEnum.ROOT,
  },
};
