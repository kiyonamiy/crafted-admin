import "./global.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AntdProvider from "@/components/antd-provider";
import Theme from "@/components/theme";
import Router from "@/router";
// import DemoPage from "@/modules/base/pages/demo";
// import LoginPage from "@/modules/base/pages/login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <Theme>
          <Router />
        </Theme>
      </AntdProvider>
    </QueryClientProvider>
  );
}

export default App;
