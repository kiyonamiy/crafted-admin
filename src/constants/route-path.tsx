import * as Icons from "@ant-design/icons";

import { rootLoader } from "@/constants/loaders/root";
import { PermissionCodeEnum } from "@/constants/permission";

// eslint-disable-next-line react-refresh/only-export-components
export enum RouteKeyEnum {
  LOGIN = "LOGIN",

  ROOT = "ROOT",
  USER = "USER",
  PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
  ROLE_MANAGEMENT = "ROLE_MANAGEMENT",
  PAGE_403 = "PAGE_403",
  PAGE_404 = "PAGE_404",
}

export interface RoutePath {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: Promise<any>;
  loader?: () => Promise<Response | null>;
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
    element: import("@/pages/base/login"),
    description: "登录页",
  },
  [RouteKeyEnum.ROOT]: {
    path: "/",
    element: import("@/components/layout"),
    description: "根路由",
    loader: rootLoader,
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
    element: import("@/pages/user/personal-information"),
    permissionCodes: [PermissionCodeEnum.USER.DETAIL],
    description: "个人信息",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.ROLE_MANAGEMENT]: {
    path: "/user/role-management",
    element: import("@/pages/user/role-management"),
    permissionCodes: [PermissionCodeEnum.USER.ROLE_LIST],
    description: "角色管理",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.PAGE_403]: {
    path: "/403",
    element: import("@/pages/base/403"),
    description: "403",
    parentKey: RouteKeyEnum.ROOT,
  },
  [RouteKeyEnum.PAGE_404]: {
    path: "*",
    element: import("@/pages/base/404"),
    description: "404",
    parentKey: RouteKeyEnum.ROOT,
  },
};
