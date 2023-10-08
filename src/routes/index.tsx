import { Navigate, RouteObject } from "react-router-dom";

import { Layout } from "@/components/layout";
import PageNotFound from "@/modules/base/404";
import Login from "@/modules/base/login";
import PersonalInformation from "@/modules/user/personal-information";
import RoleManagement from "@/modules/user/role-management";

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES: RouteObject[] = [
  { path: "/login", element: <Login /> },
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
