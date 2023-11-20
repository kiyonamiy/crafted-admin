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
    response: ({
      body,
    }: {
      body: (
        | { username: string; password: string }
        | { phone: string; verifyCode: string }
      ) & { loginType: 0 | 1 };
    }) => {
      return {
        code: 0,
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
            name: "个人信息",
            permissionType: 2,
            code: "GET#manager:base:getUserInfo",
            parentId: 0,
            sort: 1,
            id: 1,
          },
          {
            name: "成员列表",
            permissionType: 2,
            code: "GET#manager:member:list",
            parentId: 0,
            sort: 2,
            id: 2,
          },
          {
            name: "角色列表",
            permissionType: 2,
            code: "GET#manager:role:list",
            parentId: 0,
            sort: 3,
            id: 3,
          },
        ],
      };
    },
  },
];
