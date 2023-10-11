import "@/style/base/normalize.less";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";

import Router from "@/components/router";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm],
          token: {
            colorPrimary: "#5A54F9",
          },
          components: {
            Layout: {
              headerPadding: 0,
              headerHeight: 48,
            },
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
