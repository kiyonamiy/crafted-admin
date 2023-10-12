import { useEffect, useState } from "react";
import { IPosition } from "@/pages/custom-management/configuration-management/configuration/interface";
import { useConfigurationProvider } from "@/pages/custom-management/configuration-management/configuration/context";
import { SvgElement } from "./svg-element";
import styled from "styled-components";

const Container = styled.div`
  width: calc(100% - 18px);
  background: url("./src/assets/dot.bmp") repeat;
  image-rendering: pixelated;
  opacity: 0.6;
`;

const Canvas = styled.svg`
  width: 100%;
  height: 100%;
`;

export const Blueprint = () => {
  const configuration = useConfigurationProvider();
  const { elements, addElementAt } = configuration;
  const [pressedOn, setPressedOn] = useState(false);

  const [svgElements, setSvgElements] = useState<JSX.Element[]>([]);
  const [selectedList, setSelectedList] = useState<
    { id: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    const tempSelectedList = [];
    for (const element of elements) {
      tempSelectedList.push({ id: element.id, selected: false });
    }
    setSelectedList(tempSelectedList);
  }, [elements]);

  useEffect(() => {
    const svgElements = elements.map((element) => {
      return (
        <SvgElement
          key={element.id}
          property={{
            ...element,
            color: generateColor(element.position),
          }}
          selected={
            selectedList.find((item) => item.id === element.id)?.selected
          }
        />
      );
    });
    setSvgElements(svgElements);
  }, [selectedList]);

  // test
  const generateColor = (position: IPosition) => {
    return `rgb(${position.x % 255}, ${position.y % 255}, ${
      (position.x + position.y) % 255
    })`;
  };

  const getDropPosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const position = getDropPosition(e);
    addElementAt(position);
    console.log("drop");
  };

  const dragging = (e: React.MouseEvent<Element, MouseEvent>) => {
    const position = getDropPosition(e);
  };

  return (
    <Container
      onDragEnter={(e) => {
        e.preventDefault();
        console.log("drag enter");
      }}
      onDragOver={(e) => {
        e.preventDefault();
        console.log("drag over");
      }}
      onDrop={handleDrop}
      onMouseDown={() => {
        setPressedOn(true);
      }}
      onMouseMove={(e) => {
        if (pressedOn) {
          dragging(e);
        }
      }}
      onMouseUp={() => {
        setPressedOn(false);
      }}
    >
      <Canvas>
        <>
          {svgElements.map((element) => {
            return element;
          })}
        </>
      </Canvas>
    </Container>
  );
};
