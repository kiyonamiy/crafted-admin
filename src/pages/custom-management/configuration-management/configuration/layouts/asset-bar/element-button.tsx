import { Button as Btn } from "antd";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(Btn)`
  width: 100%;
`;

export const ElementButton = () => {
  return (
    <Container>
      <Button
        type="default"
        draggable
        onDragStart={() => {
          console.log("drag start");
        }}
        onDragEnd={() => {
          console.log("drag end");
        }}
      >
        按钮
      </Button>
    </Container>
  );
};
