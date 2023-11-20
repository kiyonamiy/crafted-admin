import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AntdProvider from "@/components/antd-provider";
import DemoPage from "@/pages/base/demo";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <DemoPage />
      </AntdProvider>
    </QueryClientProvider>
  );
}

export default App;
