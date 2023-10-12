import styled from "styled-components";

import { ElementButton } from "./element-button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px;
`;

const ElementList = styled.div`
  padding: 20px;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content repeat(2, 1fr);
`;

export const AssetBar = () => {
  return (
    <Container>
      <Title>图元库</Title>
      <ElementList>
        <ElementButton />
        <ElementButton />
        <ElementButton />
        <ElementButton />
        <ElementButton />
      </ElementList>
    </Container>
  );
};
