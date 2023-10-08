import { LoginResult, LoginType } from "@/types/base";
import request from "@/utils/request";

export async function login(
  data: (
    | { username: string; password: string }
    | { phone: string; verifyCode: string }
  ) & { loginType: LoginType },
) {
  return request<LoginResult>({
    url: "/login",
    method: "post",
    data,
  });
}
