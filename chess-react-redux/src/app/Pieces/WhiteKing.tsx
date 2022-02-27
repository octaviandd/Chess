/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import WhiteKingSVG from "./white_knight.svg";

type Props = {
  row: any;
  col: any;
};

export default function WhiteKing({ row, col }: Props) {
  const [collectedProps, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.PAWN,
      item: { piece: "white_king", row: row, col: col },
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
      <DragPreviewImage connect={preview} src={WhiteKingSVG}></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <g
            fill="none"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeOpacity="1"
            transform="scale(1.6) translate(3, 1)"
          >
            <path
              d="M 22.5,11.63 L 22.5,6"
              fill="none"
              stroke="#000000"
              strokeLinejoin="miter"
            />
            <path
              d="M 20,8 L 25,8"
              fill="none"
              stroke="#000000"
              strokeLinejoin="miter"
            />
            <path
              d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
              fill="#ffffff"
              stroke="#000000"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            <path
              d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
              fill="#ffffff"
              stroke="#000000"
            />
            <path
              d="M 11.5,30 C 17,27 27,27 32.5,30"
              fill="none"
              stroke="#000000;"
            />
            <path
              d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
              fill="none"
              stroke="#000000;"
            />
            <path
              d="M 11.5,37 C 17,34 27,34 32.5,37"
              fill="none"
              stroke="#000000"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
