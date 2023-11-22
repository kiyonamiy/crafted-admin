// eslint-disable-next-line react-refresh/only-export-components
export enum RouteKeyEnum {
  ROOT = "ROOT",

  //   USER = "USER",
  //   PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
  //   ROLE_MANAGEMENT = "ROLE_MANAGEMENT",

  //   SYSTEM = "SYSTEM",
  //   USER_MANAGEMENT = "USER_MANAGEMENT",
  //   INSTITUTION_MANAGEMENT = "INSTITUTION_MANAGEMENT",
  //   TOPO_MANAGEMENT = "TOPO_MANAGEMENT",
  //   TOPO_EDITOR = "TOPO_EDITOR",
  //   PERMISSION = "PERMISSION",
  //   DICT_MANAGEMENT = "DICT_MANAGEMENT",

  LOGIN = "LOGIN",
  PAGE_403 = "PAGE_403",
  PAGE_404 = "PAGE_404",
}

// loader、element、menu.icon 均在 router 中做配置
export interface RouteObject {
  path: string;
  description: string;
  //   element?: string; // TODO 改为 map 的 key 值
  //   loader?: string; // TODO 改为 map 的 key 值
  access?: string[]; // 数组内的条件都满足才可以访问 // TODO 改为 map 的 key 值
  parentKey?: RouteKeyEnum;
  // 作为菜单
  menu?: {
    icon?: React.ReactNode;
  };
}

export const RouteObjectEnum: Record<RouteKeyEnum, RouteObject> = {
  [RouteKeyEnum.ROOT]: {
    path: "/",
    description: "根路由",
  },
  //   // ----------------------- 账户中心 -----------------------
  //   [RouteKeyEnum.USER]: {
  //     path: "/user",
  //     description: "账户中心",
  //     parentKey: RouteKeyEnum.ROOT,
  //     menu: {
  //       icon: <Icons.UserOutlined />,
  //     },
  //   },
  //   [RouteKeyEnum.PERSONAL_INFORMATION]: {
  //     path: "/user/personal-information",
  //     element: import("@/pages/user/personal-information"),
  //     description: "个人信息",
  //     parentKey: RouteKeyEnum.USER,
  //     menu: {},
  //   },
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
  //   [RouteKeyEnum.ROLE_MANAGEMENT]: {
  //     path: "/system/role-management",
  //     element: import("@/pages/system/role-management"),
  //     permissionCodes: [PermissionCodeEnum.ROLE.MODULE],
  //     description: "角色管理",
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
