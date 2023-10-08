import "@/style/base/normalize.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./routes";

const queryClient = new QueryClient();
function App() {
  const routerRef = useRef(createBrowserRouter(ROUTES));
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routerRef.current} />
    </QueryClientProvider>
  );
}

export default App;
