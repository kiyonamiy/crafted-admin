import { Spin } from "antd";
import { RouterProvider } from "react-router-dom";

import { useRouter } from "./hooks/router";

export default function Router() {
  const { router, isLoading } = useRouter();
  if (isLoading || router == null) {
    return <Spin />;
  }
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}
