import "@/style/base/normalize.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./routes";

const queryClient = new QueryClient();
function App() {
  const routerRef = useRef(createBrowserRouter(ROUTES));
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm],
          token: {
            colorPrimary: "#5A54F9",
          },
        }}
      >
        <RouterProvider router={routerRef.current} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
