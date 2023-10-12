export interface IPosition {
  x: number;
  y: number;
}

export interface IProperty {
  id: string;
  position: IPosition;
}

// 一些用于呈现在画面上的属性（图片src、颜色、大小等）
export interface ISvgProperty extends IProperty {
  // test
  color: string;
}

// export interface Renderable {
//   render(): JSX.Element;
// }

// export class SvgElement implements Renderable {
//   property: ISvgProperty;

//   selected: boolean = false;

//   constructor(property: ISvgProperty) {
//     this.property = property;
//   }

//   render() {
//     const { id, position, color } = this.property;

//     return (
//       // test
//       <rect
//         onClick={() => {
//           this.selected = !this.selected;
//         }}
//         key={id}
//         x={position.x}
//         y={position.y}
//         width="100"
//         height="100"
//         fill={color}
//         stroke={this.selected ? "red" : "transparent"}
//       />
//     );
//   }
// }
