import localforage from "localforage";
import { redirect } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResult } from "@/types/base";

export const rootLoader = async () => {
  // TODO 在此处发起一次校验 token 的请求（只会执行一次）
  const loginResult = await localforage.getItem<LoginResult>(
    LocalKeyEnum.LOGIN_RESULT,
  );
  if (loginResult?.token == null) {
    return redirect("/login");
  }
  return null;
};
