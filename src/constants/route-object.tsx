import { DeploymentUnitOutlined, UserOutlined } from "@ant-design/icons";

import { PermissionCodeEnum } from "./permission";
import { RouteKeyEnum } from "./route-key";

export interface RouteObject {
  path: string;
  description: string;
  parentKey?: RouteKeyEnum;
  permissionCodes?: string[];

  // element 如果是 Layout，请设置为 true，设置后便能默认加载 children 的第一项
  isLayout?: boolean;
  // 作为菜单
  menu?: {
    icon?: React.ReactNode;
  };
}

export const RouteObjectEnum: Record<RouteKeyEnum, RouteObject> = {
  [RouteKeyEnum.ROOT]: {
    path: "/",
    description: "根路由",
    isLayout: true,
  },
  [RouteKeyEnum.PERSONAL_INFORMATION]: {
    path: "/personal-information",
    description: "个人信息",
    parentKey: RouteKeyEnum.ROOT,
    menu: {
      icon: <UserOutlined />,
    },
  },
  [RouteKeyEnum.SYSTEM]: {
    path: "/system",
    description: "系统管理",
    parentKey: RouteKeyEnum.ROOT,
    menu: {
      icon: <DeploymentUnitOutlined />,
    },
  },
  [RouteKeyEnum.ROLE_MANAGEMENT]: {
    path: "/system/role-management",
    permissionCodes: [PermissionCodeEnum.ROLE.MODULE],
    description: "角色管理",
    parentKey: RouteKeyEnum.SYSTEM,
    menu: {},
  },
  //   // ----------------------- 系统管理 -----------------------
  //   [RouteKeyEnum.SYSTEM]: {
  //     path: "/system",
  //     description: "系统管理",
  //     parentKey: RouteKeyEnum.ROOT,
  //     menu: {
  //       icon: <Icons.DeploymentUnitOutlined />,
  //     },
  //   },
  //   [RouteKeyEnum.DICT_MANAGEMENT]: {
  //     path: "/system/dict-management",
  //     element: import("@/pages/system/dict-management"),
  //     permissionCodes: [PermissionCodeEnum.DICT.MODULE],
  //     description: "字典管理",
  //     parentKey: RouteKeyEnum.SYSTEM,
  //     menu: {},
  //   },
  //   [RouteKeyEnum.INSTITUTION_MANAGEMENT]: {
  //     path: "/system/institution-management",
  //     element: import("@/pages/system/institution-management"),
  //     permissionCodes: [PermissionCodeEnum.INSTITUTION.MODULE],
  //     description: "机构管理",
  //     parentKey: RouteKeyEnum.SYSTEM,
  //     menu: {},
  //   },
  //   [RouteKeyEnum.PERMISSION]: {
  //     path: "/system/permission",
  //     element: import("@/pages/system/permission"),
  //     permissionCodes: [PermissionCodeEnum.PERMISSION.MODULE],
  //     description: "权限点管理",
  //     parentKey: RouteKeyEnum.SYSTEM,
  //     menu: {},
  //   },
  //   [RouteKeyEnum.USER_MANAGEMENT]: {
  //     path: "/system/user-management",
  //     element: import("@/pages/system/user-management"),
  //     permissionCodes: [PermissionCodeEnum.USER.MODULE],
  //     description: "用户管理",
  //     parentKey: RouteKeyEnum.SYSTEM,
  //     menu: {},
  //   },
  // ----------------------- 其他页面 -----------------------
  [RouteKeyEnum.LOGIN]: {
    path: "/login",
    description: "登录页",
  },
  [RouteKeyEnum.PAGE_403]: {
    path: "/forbidden",
    description: "未授权",
  },
  [RouteKeyEnum.PAGE_404]: {
    path: "*",
    description: "未认证",
  },
};
