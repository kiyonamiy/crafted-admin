import { App, ConfigProvider, theme } from "antd";

interface AntdProviderProps {
  children: React.ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.defaultAlgorithm],
        token: {
          colorPrimary: "#1890ff",
        },
        components: {
          Layout: {
            headerPadding: 0,
            headerHeight: 48,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default AntdProvider;
