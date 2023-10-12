import styled from "styled-components";

const Container = styled.div`
  border-bottom: 2px solid #f5f5f5;
  grid-column: 1 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = () => {
  return <Container>header</Container>;
};
