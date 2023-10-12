import { useRef, useState } from "react";
import { ISvgProperty } from "../../interface";

export const SvgElement = (props: {
  property: ISvgProperty;
  selected?: boolean;
}) => {
  const { id, position, color } = props.property;
  const { selected } = props;
  const elementRef = useRef<SVGRectElement>(null);

  return (
    // test
    <rect
      ref={elementRef}
      key={id}
      x={position.x}
      y={position.y}
      width="100"
      height="100"
      fill={color}
      stroke={selected ? "red" : "transparent"}
    />
  );
};
