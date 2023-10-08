export default [
  {
    url: "/login",
    method: "post",
    timeout: 1000,
    response: ({
      body,
    }: {
      body: (
        | { username: string; password: string }
        | { phone: string; verifyCode: string }
      ) & { loginType: 0 | 1 };
    }) => {
      if (
        "username" in body &&
        "password" in body &&
        body.loginType === 0 &&
        body.username === "admin" &&
        // md5 admin 的结果
        body.password === "21232f297a57a5a743894a0e4a801fc3"
      ) {
        return {
          code: 0,
          message: "操作成功",
          data: { id: "110", name: "kiyonami", token: "faketoken" },
        };
      }
      if (
        "phone" in body &&
        "verifyCode" in body &&
        body.loginType === 1 &&
        body.phone === "10000000000" &&
        body.verifyCode === "1234"
      ) {
        return {
          code: 0,
          message: "操作成功",
          data: { id: "110", name: "kiyonami", token: "faketoken" },
        };
      }

      return {
        code: 401,
        message: "认证失败",
      };
    },
  },
];
