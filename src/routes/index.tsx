import { Navigate, RouteObject } from "react-router-dom";

import { Layout } from "@/components/layout";
import PageNotFound from "@/pages/base/404";
import Login from "@/pages/base/login";
import PersonalInformation from "@/pages/user/personal-information";
import RoleManagement from "@/pages/user/role-management";

import { rootLoader } from "./loaders/root";

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES: RouteObject[] = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    loader: rootLoader,
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
