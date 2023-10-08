export default [
  {
    url: "/user/getUserInfo",
    method: "get",
    timeout: 1000,
    response: ({ body, query }) => {
      return {
        code: 0,
        message: "操作成功",
        data: { nickname: "kiyoanmiy", age: 20 },
      };
    },
  },
  {
    url: "/user/getRoleList",
    method: "get",
    timeout: 1000,
    response: ({ body, query }) => {
      return {
        code: 401,
        message: "认证失败",
      };
    },
    statusCode: 401,
  },
];
