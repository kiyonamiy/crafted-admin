// test data

export default [
  {
    url: "/ca/login",
    method: "post",
    timeout: 1000,
    response: ({
      body,
    }: {
      body: {
        account?: string;
        phoneNumber?: string;
        password: string;
        loginType: 0 | 1;
      };
    }) => {
      if (
        "account" in body &&
        "password" in body &&
        body.loginType === 0 &&
        body.account === "admin" &&
        // md5 admin 的结果
        body.password === "21232f297a57a5a743894a0e4a801fc3"
      ) {
        return {
          code: 0,
          message: "操作成功",
          data: { id: 110, name: "kiyonami", token: "faketoken" },
        };
      }

      return {
        code: 401,
        message: "认证失败",
      };
    },
  },
  {
    url: "/ca/userLogout",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        data: true,
        message: "操作成功",
      };
    },
  },
  {
    url: "/ca/list-all-permission",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: [
          {
            code: "system",
            name: "系统管理",
            permissionType: 1,
            sort: 0,
            parentId: 0,
            id: 16,
          },
          {
            code: "system:dict",
            name: "系统-字典管理",
            permissionType: 1,
            sort: 0,
            parentId: 16,
            id: 17,
          },
          {
            code: "system:institution",
            name: "系统-机构管理",
            permissionType: 1,
            sort: 0,
            parentId: 16,
            id: 19,
          },
          {
            code: "system:institution:create",
            name: "系统-机构-新增",
            permissionType: 2,
            sort: 0,
            parentId: 19,
            id: 20,
          },
          {
            code: "system:institution:update",
            name: "系统-机构-更新",
            permissionType: 2,
            sort: 0,
            parentId: 19,
            id: 21,
          },
          {
            code: "system:institution:delete",
            name: "系统-机构-删除",
            permissionType: 2,
            sort: 0,
            parentId: 19,
            id: 22,
          },
          {
            code: "system:permission",
            name: "系统-权限点管理",
            permissionType: 1,
            sort: 0,
            parentId: 16,
            id: 23,
          },
          {
            code: "system:role",
            name: "系统-角色管理",
            permissionType: 1,
            sort: 0,
            parentId: 16,
            id: 24,
          },
          {
            code: "system:user",
            name: "系统-用户管理",
            permissionType: 1,
            sort: 0,
            parentId: 16,
            id: 25,
          },
          {
            code: "system:dict-type",
            name: "系统-字典类型管理",
            permissionType: 1,
            sort: 0,
            parentId: 17,
            id: 43,
          },
          {
            code: "system:dict-type:create",
            name: "系统-字典类型-新增",
            permissionType: 2,
            sort: 0,
            parentId: 43,
            id: 44,
          },
          {
            code: "system:dict-type:update",
            name: "系统-字典类型-更新",
            permissionType: 2,
            sort: 0,
            parentId: 43,
            id: 45,
          },
          {
            code: "system:dict-type:delete",
            name: "系统-字典类型-删除",
            permissionType: 2,
            sort: 0,
            parentId: 43,
            id: 46,
          },
          {
            code: "system:dict-data",
            name: "系统-字典数据管理",
            permissionType: 1,
            sort: 0,
            parentId: 17,
            id: 47,
          },
          {
            code: "system:dict-data:create",
            name: "系统-字典数据-新增",
            permissionType: 2,
            sort: 0,
            parentId: 47,
            id: 48,
          },
          {
            code: "system:dict-data:update",
            name: "系统-字典数据-更新",
            permissionType: 2,
            sort: 0,
            parentId: 47,
            id: 49,
          },
          {
            code: "system:dict-data:delete",
            name: "系统-字典数据-删除",
            permissionType: 2,
            sort: 0,
            parentId: 47,
            id: 50,
          },
          {
            code: "system:institution:get",
            name: "系统-机构-查询",
            permissionType: 2,
            sort: 0,
            parentId: 19,
            id: 51,
          },
          {
            code: "system:permission:create",
            name: "系统-权限点-创建",
            permissionType: 2,
            sort: 0,
            parentId: 23,
            id: 52,
          },
          {
            code: "system:permission:update",
            name: "系统-权限点-更新",
            permissionType: 2,
            sort: 0,
            parentId: 23,
            id: 53,
          },
          {
            code: "system:permission:delete",
            name: "系统-权限点-删除",
            permissionType: 2,
            sort: 0,
            parentId: 23,
            id: 54,
          },
          {
            code: "system:permission:get",
            name: "系统-权限点-查询",
            permissionType: 2,
            sort: 0,
            parentId: 23,
            id: 55,
          },
          {
            code: "system:permission:assign",
            name: "系统-角色-赋予权限",
            permissionType: 2,
            sort: 0,
            parentId: 24,
            id: 56,
          },
          {
            code: "system:role:create",
            name: "系统-角色-新增",
            permissionType: 2,
            sort: 0,
            parentId: 24,
            id: 57,
          },
          {
            code: "system:role:update",
            name: "系统-角色-更新",
            permissionType: 2,
            sort: 0,
            parentId: 24,
            id: 58,
          },
          {
            code: "system:role:delete",
            name: "系统-角色-删除",
            permissionType: 2,
            sort: 0,
            parentId: 24,
            id: 59,
          },
          {
            code: "system:role:get",
            name: "系统-角色-查询",
            permissionType: 2,
            sort: 0,
            parentId: 24,
            id: 60,
          },
          {
            code: "system:user:create",
            name: "系统-账号-新增",
            permissionType: 2,
            sort: 0,
            parentId: 25,
            id: 61,
          },
          {
            code: "system:user:update",
            name: "系统-账号-更新",
            permissionType: 2,
            sort: 0,
            parentId: 25,
            id: 62,
          },
          {
            code: "system:user:get",
            name: "系统-账号-查询",
            permissionType: 2,
            sort: 0,
            parentId: 25,
            id: 63,
          },
        ],
      };
    },
  },
  {
    url: "/ca/user-info",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          id: 24,
          account: "admin",
          phoneNumber: "1000000000",
          name: "管理员",
          roles: ["平台管理员"],
          roleIds: [1],
          institution: "管理员公司",
          institutionId: 1,
          createTime: "2023-10-30 18:19:29",
          status: 1,
          statusStr: "正常",
        },
      };
    },
  },
];
