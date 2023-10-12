import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const RulerX = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC)
    repeat-x;
  width: calc(100% - 18px);
  height: 18px;
  margin-left: 18px;
  opacity: 0.6;
`;

const RulerY = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC)
    repeat-y;
  width: 18px;
  height: calc(100% - 18px);
  top: 18px;
  opacity: 0.6;
`;

export const Rulers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <RulerX />
      <RulerY />
      {children}
    </Container>
  );
};
