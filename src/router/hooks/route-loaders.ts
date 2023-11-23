import { App } from "antd";
import { useCallback } from "react";
import { redirect, RouteObject } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteKeyEnum } from "@/constants/route-key";
import { RouteObjectEnum } from "@/constants/route-object";
import { LoginResponseData } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";

export const useRouteLoaders = (): Record<
  RouteKeyEnum,
  RouteObject["loader"]
> => {
  const { message } = App.useApp();

  const checkLogin = useCallback(() => {
    const loginRespData = LocalStorageUtils.getItem<LoginResponseData>(
      LocalKeyEnum.LOGIN_RESULT,
    );
    if (loginRespData?.token == null) {
      void message.error("请先登录");
      return redirect(RouteObjectEnum.LOGIN.path);
    }

    return null;
  }, [message]);

  return {
    [RouteKeyEnum.LOGIN]: undefined,
    [RouteKeyEnum.PAGE_403]: undefined,
    [RouteKeyEnum.PAGE_404]: undefined,

    [RouteKeyEnum.ROOT]: checkLogin,
    [RouteKeyEnum.PERSONAL_INFORMATION]: undefined,
  };
};
