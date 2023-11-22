import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  RouteKeyEnum,
  RouteObject,
  RouteObjectEnum,
} from "@/constants/route-object";

/**
 * 返回路由的 key 和 routePath
 * 如果外部没有指定 pathname，则使用当前路由
 * @param pathname
 * @returns
 */
export const useRoutePathKeyValue = (pathname?: string) => {
  const { pathname: currentPathname } = useLocation();
  const finalPathname = pathname ?? currentPathname;
  const routePathKeyValue: [RouteKeyEnum, RouteObject] | undefined =
    useMemo(() => {
      return Object.entries(RouteObjectEnum).find(([, value]) => {
        // TODO 优化
        if (finalPathname === value.path) {
          return true;
        }
      }) as [RouteKeyEnum, RouteObject];
    }, [finalPathname]);
  return routePathKeyValue ?? [undefined, undefined];
};

/**
 * 返回路由当前的 key 值，和其所有的父 keys
 * @param pathname
 * @returns
 */
export const useRouteFullPath = (pathname?: string) => {
  const [key] = useRoutePathKeyValue(pathname);
  const parentKeys = useMemo(() => {
    const result: RouteKeyEnum[] = [];
    if (key == null) {
      return;
    }
    const recursive = (openKey: RouteKeyEnum) => {
      Object.entries(RouteObjectEnum).forEach(([key, value]) => {
        if (
          (key as RouteKeyEnum) === openKey &&
          value.parentKey != null &&
          value.parentKey != RouteKeyEnum.ROOT
        ) {
          recursive(value.parentKey);
          result.push(value.parentKey);
        }
      });
    };
    recursive(key);
    return result;
  }, [key]);

  return {
    key,
    parentKeys,
  };
};
