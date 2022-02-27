/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import WhiteBishopSVG from "./white_bishop.svg";

type Props = {
  row: any;
  col: any;
};

const style = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

export default function WhiteBishop({ row, col }: Props) {
  const [collectedProps, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.PAWN,
      item: { piece: "white_bishop", row: row, col: col },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    []
  );
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={WhiteBishopSVG}
      ></DragPreviewImage>
      <div
        style={{ ...style, opacity: collectedProps.isDragging ? 0.5 : 1 }}
        ref={drag}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <g
            opacity="1"
            fill="none"
            fillRule="evenodd"
            fillOpacity="1"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeOpacity="1"
            transform="scale(1.6) translate(3, 1)"
          >
            <g fill="#ffffff" stroke="#000000" strokeLinecap="butt">
              <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
              <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
              <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
            </g>
            <path
              d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
              fill="none"
              stroke="#000000"
              strokeLinejoin="miter"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
