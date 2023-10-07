import { Navigate, RouteObject } from "react-router-dom";

import { Layout } from "@/components/Layout";
import PageNotFound from "@/modules/base/404";
import PersonalInformation from "@/modules/user/personal-information";
import RoleManagement from "@/modules/user/role-management";

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES: RouteObject[] = [
  { path: "/login", element: null },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user/personal-information" replace />,
      },
      {
        path: "/user",
        children: [
          {
            index: true,
            element: <Navigate to="/user/personal-information" replace />,
          },
          {
            path: "/user/personal-information",
            element: <PersonalInformation />,
          },
          {
            path: "/user/role-management",
            element: <RoleManagement />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
