export default [
  {
    url: "/user/getUserInfo",
    method: "get",
    response: ({ body, query }) => {
      return {
        code: 0,
        message: "操作成功",
        data: { nickname: "kiyoanmiy", age: 20 },
      };
    },
  },
];
