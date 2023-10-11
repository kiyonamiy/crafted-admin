import { Navigate, RouteObject } from "react-router-dom";

import { RouteKeyEnum, RoutePathEnum } from "@/constants/route-path";

/**
 * 描述：根据 RoutePathEnum 和 RouteObjectMap 生成最终路由；
 * 算法：根据 parentKey 找出所有孩子节点，拼出父子路由结构；
 * 提示：根节点的 parentKey 为 undefined；
 */
const generateRoutes = (parentKey?: RouteKeyEnum): RouteObject[] => {
  const result: RouteObject[] = [];
  Object.entries(RoutePathEnum).forEach(([key, value]) => {
    if (value?.parentKey === parentKey) {
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
  });
  return result;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES: RouteObject[] = generateRoutes();
