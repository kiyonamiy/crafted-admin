import { Spin } from "antd";
import { RouterProvider } from "react-router-dom";

import { useRouter } from "@/components/router/hooks/router";

export default function Router() {
  const router = useRouter();
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}
