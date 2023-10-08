import "@/style/base/normalize.less";

import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./routes";

function App() {
  const routerRef = useRef(createBrowserRouter(ROUTES));
  // useEffect(() => {}, []);
  return <RouterProvider router={routerRef.current} />;
}

export default App;
