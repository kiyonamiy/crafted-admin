import { theme } from "antd";

interface ThemeProps {
  children: React.ReactNode;
}

function Theme({ children }: ThemeProps) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div
      style={{
        ["--primary-color" as never]: colorPrimary,
      }}
    >
      {children}
    </div>
  );
}

export default Theme;
