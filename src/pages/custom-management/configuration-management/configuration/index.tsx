import styled from "styled-components";

import { ConfigurationProvider } from "./context";
import { AssetBar } from "./layouts/asset-bar";
import { Editor } from "./layouts/editor";
import { Header } from "./layouts/header";
import { PropertyBar } from "./layouts/property-bar";

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px auto 300px;
  grid-template-rows: 50px repeat(1, 1fr);
`;

function Configuration() {
  return (
    <ConfigurationProvider>
      <PageContainer>
        <Header />
        <AssetBar />
        <Editor />
        <PropertyBar />
      </PageContainer>
    </ConfigurationProvider>
  );
}

export default Configuration;
