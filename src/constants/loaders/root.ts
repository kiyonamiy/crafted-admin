import localforage from "localforage";
import { redirect } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RoutePathEnum } from "@/constants/route-path";
import { LoginResult } from "@/types/base";

export const rootLoader = async () => {
  const loginResult = await localforage.getItem<LoginResult>(
    LocalKeyEnum.LOGIN_RESULT,
  );
  if (loginResult?.token == null) {
    return redirect(RoutePathEnum.LOGIN.path);
  }
  return null;
};
