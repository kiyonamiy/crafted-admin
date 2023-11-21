import useReqMutation from "@/hooks/request/mutation";
import { LoginResponseData } from "@/types/base";

import { LoginType } from "../../../types";

interface LoginPayload {
  account?: string;
  phoneNumber?: string;
  password: string;
  loginType: LoginType;
}

/**
 * 以页面维度做 service 的拆分
 * @returns
 */
export const useServices = () => {
  const loginMutation = useReqMutation<LoginPayload, LoginResponseData>({
    url: "/ca/login",
    method: "post",
  });

  const logoutMutation = useReqMutation<undefined, void>({
    url: "/ca/userLogout",
    method: "post",
  });

  return {
    loginMutation,
    logoutMutation,
  };
};
