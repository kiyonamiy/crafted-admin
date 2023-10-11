import { useCallback, useMemo } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import { RouteKeyEnum, RoutePathEnum } from "@/constants/route-path";
import { usePermissions } from "@/hooks/permissions";

export const useRouter = () => {
  const { checkPermission } = usePermissions();
  const generateRoutes = useCallback(
    (parentKey?: RouteKeyEnum): RouteObject[] => {
      const result: RouteObject[] = [];
      Object.entries(RoutePathEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 符合权限的 路由
          if (
            value.permissionCodes == null ||
            value.permissionCodes.every(checkPermission)
          ) {
            const route: RouteObject = {
              path: value.path,
              loader: value.loader,
              lazy:
                value.element != null
                  ? async () => {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      const Component = (await value.element).default;
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
            // 没有 element 的 route （或者根路由）默认指向 children[0]
            if (
              ([RouteKeyEnum.ROOT].includes(key as RouteKeyEnum) ||
                route.lazy == null) &&
              route.children != null
            ) {
              route.children.unshift({
                index: true,
                element: <Navigate to={route.children[0].path!} replace />,
              });
            }
            result.push(route);
          }
        }
      });
      return result;
    },
    [checkPermission],
  );

  const router = useMemo(() => {
    const routes = generateRoutes();
    return createBrowserRouter(routes);
  }, [generateRoutes]);
  return router;
};
