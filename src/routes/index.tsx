import { Navigate, RouteObject } from "react-router-dom";

import { RouteKeyEnum, RoutePathEnum } from "@/constants/route-path";
import PageNotFound from "@/pages/base/404";
import Login from "@/pages/base/login";
import PersonalInformation from "@/pages/user/personal-information";
import RoleManagement from "@/pages/user/role-management";

import { Layout } from "./layout";
import { rootLoader } from "./loaders/root";

// 为了解决循环引用的问题，将 element 映射拆出到 routes/index.tsx 文件（本可以与 RoutePathEnum 合并）
const RouteObjectMap: Record<RouteKeyEnum, RouteObject> = {
  [RouteKeyEnum.LOGIN]: {
    element: <Login />,
  },
  [RouteKeyEnum.ROOT]: {
    loader: rootLoader,
    element: <Layout />,
  },
  [RouteKeyEnum.USER]: {},
  [RouteKeyEnum.PERSONAL_INFORMATION]: {
    element: <PersonalInformation />,
  },
  [RouteKeyEnum.ROLE_MANAGEMENT]: {
    element: <RoleManagement />,
  },
  [RouteKeyEnum.PAGE_404]: {
    element: <PageNotFound />,
  },
};

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
        ...RouteObjectMap[key as RouteKeyEnum], // 填充其他 route 信息
      };
      route.children = generateRoutes(key as RouteKeyEnum);
      if (route.children?.length === 0) {
        delete route.children;
      }
      // 没有 element 的 route （或者根路由）默认指向 children[0]
      if (
        ([RouteKeyEnum.ROOT].includes(key as RouteKeyEnum) ||
          route.element == null) &&
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
