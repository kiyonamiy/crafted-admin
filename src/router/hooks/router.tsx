import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import { RouteKeyEnum } from "@/constants/route-key";
import { RouteObjectEnum } from "@/constants/route-object";
import RouteElementEnum from "@/modules";

import { useRouteLoaders } from "./route-loaders";

export const useRouter = () => {
  const loaderMap = useRouteLoaders();

  const generateRoutes = useCallback(
    (parentKey?: RouteKeyEnum): RouteObject[] => {
      const result: RouteObject[] = [];
      Object.entries(RouteObjectEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 初始 route，赋值各个字段
          const route: RouteObject = {
            path: value.path,
            loader: loaderMap[key as RouteKeyEnum],
            lazy:
              RouteElementEnum[key as RouteKeyEnum] != null
                ? async () => {
                    const Component = (
                      await RouteElementEnum[key as RouteKeyEnum]!
                    ).default;
                    return {
                      element: <Component />,
                    };
                  }
                : undefined,
          };
          // 递归构建 children
          route.children = generateRoutes(key as RouteKeyEnum);
          if (route.children?.length === 0) {
            delete route.children;
          }
          // 没有 element 的 route 默认指向 children[0]
          if (
            (!!RouteObjectEnum[key as RouteKeyEnum].isLayout ||
              route.lazy == null) &&
            route.children != null
          ) {
            route.children.unshift({
              index: true,
              element: (
                <Navigate
                  to={route.children[0].path ?? RouteObjectEnum.PAGE_404.path}
                  replace
                />
              ),
            });
          }
          result.push(route);
        }
      });
      return result;
    },
    [loaderMap],
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
