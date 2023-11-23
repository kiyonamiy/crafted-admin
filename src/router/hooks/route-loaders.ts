import { App } from "antd";
import { useCallback, useMemo } from "react";
import { redirect, RouteObject } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteKeyEnum } from "@/constants/route-key";
import { RouteObjectEnum } from "@/constants/route-object";
import { LoginResponseData } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";
import { checkPermission } from "@/utils/permission";

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

  const checkPermissions = useCallback(
    (permissionCodes?: string[]) => () => {
      if (permissionCodes?.some((code) => !checkPermission(code))) {
        return redirect(RouteObjectEnum.PAGE_403.path);
      }
      return null;
    },
    [],
  );

  // 默认增加权限校验
  const defaultLoaders: Record<RouteKeyEnum, RouteObject["loader"]> = useMemo(
    () =>
      Object.entries(RouteObjectEnum).reduce(
        (prev, [key, value]) => {
          if (value.permissionCodes != null) {
            return {
              ...prev,
              [key]: checkPermissions(value.permissionCodes),
            };
          }
          return {
            ...prev,
            [key]: undefined,
          };
        },
        {} as Record<RouteKeyEnum, RouteObject["loader"]>,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    ...defaultLoaders,
    [RouteKeyEnum.ROOT]: checkLogin,
  };
};
