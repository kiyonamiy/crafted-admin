import { LoginResult, LoginType } from "@/types/base";
import request from "@/utils/request";

export const BaseService = {
  login: async (
    data: (
      | { username: string; password: string }
      | { phone: string; verifyCode: string }
    ) & { loginType: LoginType },
  ) => {
    return request<LoginResult>({
      url: "/login",
      method: "post",
      data,
    });
  },
  logout: async () => {
    return request({
      url: "/logout",
      method: "post",
    });
  },
};
