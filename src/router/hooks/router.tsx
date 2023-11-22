import { useQuery } from "@tanstack/react-query";
import { App } from "antd";
import { useCallback } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouteObject,
} from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteKeyEnum, RouteObjectEnum } from "@/constants/route-object";
import { LoginResponseData } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";

import { RouteElementMap } from "../constants/route-element-map";
import { RouteLoaderMap } from "../constants/route-loader-map";
// import { checkPermission } from "@/utils/permission";

/**
 * 找到第一个"满足权限"的"叶"节点
 * @param parentKey
 * @returns
 */
const findFirstAuthorizedPath = (
  parentKey: RouteKeyEnum,
): string | undefined => {
  const routePaths = Object.entries(RouteObjectEnum);
  for (const [key, value] of routePaths) {
    if (value.parentKey === parentKey) {
      const isLeaf = Object.values(RouteObjectEnum).every(
        ({ parentKey }) => parentKey !== (key as RouteKeyEnum),
      );

      // TODO
      // const isAuthorized =
      //   value.permissionCodes == null ||
      //   value.permissionCodes?.every((code) => checkPermission(code));
      // if (isLeaf && isAuthorized) {
      if (isLeaf) {
        return value.path;
      } else {
        const result = findFirstAuthorizedPath(key as RouteKeyEnum);
        if (result != null) {
          return result;
        }
      }
    }
  }
  return undefined;
};

/**
 * TODO 是有要强化 loader 来校验权限（像 login 之类的，就不需要添加）
 */
const shouldValidatePermission = (parentKey: RouteKeyEnum): boolean => {
  console.log(parentKey);
  // if (RouteObjectEnum[parentKey].permissionCodes != null) {
  //   return true;
  // }
  // // 检查所有孩子节点，是否需要权限校验
  // const routePaths = Object.entries(RouteObjectEnum);
  // for (const [key, value] of routePaths) {
  //   if (value.parentKey === parentKey) {
  //     if (value.permissionCodes != null) {
  //       return true;
  //     } else {
  //       if (shouldValidatePermission(key as RouteKeyEnum)) {
  //         return true;
  //       }
  //     }
  //   }
  // }
  return false;
};

export const useRouter = () => {
  const { message } = App.useApp();
  const generateRoutes = useCallback(
    (parentKey?: RouteKeyEnum): RouteObject[] => {
      const result: RouteObject[] = [];
      Object.entries(RouteObjectEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 初始 route，赋值各个字段
          const route: RouteObject = {
            path: value.path,
            loader: RouteLoaderMap[key as RouteKeyEnum],
          };
          // 加默认权限拦截（强化 loader）（处理“用户直接复制链接跳转”的情况）
          if (shouldValidatePermission(key as RouteKeyEnum)) {
            route.loader = (...args) => {
              console.debug("now route.loader is", key);
              // 401 判断
              const loginRespData =
                LocalStorageUtils.getItem<LoginResponseData>(
                  LocalKeyEnum.LOGIN_RESULT,
                );
              if (loginRespData?.token == null) {
                void message.error("请先登录");
                return redirect(RouteObjectEnum.LOGIN.path);
              }
              // TODO 403 判断
              // if (
              //   value.permissionCodes?.some((code) => !checkPermission(code))
              // ) {
              //   return redirect(RouteObjectEnum.PAGE_403.path);
              // }
              // 执行已有的 loader 逻辑（上面的逻辑是对该 loader 的加强）
              return route.loader?.(...args) ?? null;
            };
          }
          // lazy
          if (RouteElementMap[key as RouteKeyEnum] != null) {
            route.lazy = async () => {
              const Component = (await RouteElementMap[key as RouteKeyEnum])
                .default;
              return {
                element: <Component />,
              };
            };
          }
          // 递归构建 children
          route.children = generateRoutes(key as RouteKeyEnum);
          if (route.children?.length === 0) {
            delete route.children;
          }
          // 没有 element 的 route （或者根路由）默认指向 children[0]
          if (
            ([RouteKeyEnum.ROOT].includes(key as RouteKeyEnum) ||
              route.lazy == null) &&
            route.children != null
          ) {
            const defaultPath = findFirstAuthorizedPath(key as RouteKeyEnum);
            route.children.unshift({
              index: true,
              element: (
                <Navigate
                  to={defaultPath ?? RouteObjectEnum.PAGE_404.path}
                  replace
                />
              ),
            });
          }
          result.push(route);
        }
        // }
      });
      return result;
    },
    [message],
  );

  const { data: router, isLoading } = useQuery({
    queryKey: ["ROUTER"],
    queryFn: () => {
      const routes = generateRoutes();
      return createBrowserRouter(routes);
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { router, isLoading };
};
