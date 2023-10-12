import styled from "styled-components";

import { Blueprint } from "./blueprint";
import { Rulers } from "./ruler";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Editor = () => {
  return (
    <Container>
      <Rulers>
        <Blueprint></Blueprint>
      </Rulers>
    </Container>
  );
};
