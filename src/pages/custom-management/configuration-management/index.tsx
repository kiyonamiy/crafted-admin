import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { RoutePathEnum } from "@/constants/route-path";

const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
`;

export default function ConfigurationManagement() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Button
        type="primary"
        onClick={() => {
          navigate(RoutePathEnum.CONFIGURATION.path);
        }}
      >
        进入
      </Button>
    </PageContainer>
  );
}
