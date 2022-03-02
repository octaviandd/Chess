/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { canRookMove, checkPossibleMovesInCheck } from "../../game";
import { ItemTypes } from "../../ItemTypes";
import WhiteRookSVG from "./white_rook.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

export default function WhiteRook({ row, col, board, kingsChecks }: Props) {
  let item = "white_rook";
  let moves = canRookMove(board, row, col, "white");
  let returnable: any = [];
  let canMove = false;
  const { whiteKingPositionsOnTheDirectionOfCheck, whiteKingPositionsOfCheck } =
    kingsChecks;
  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves && whiteKingPositionsOfCheck) {
          for (let i = 0; i < moves.length; i++) {
            for (
              let j = 0;
              j < whiteKingPositionsOnTheDirectionOfCheck.length;
              j++
            ) {
              if (
                moves[i].row ===
                  whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                moves[i].column ===
                  whiteKingPositionsOnTheDirectionOfCheck[j].column
              ) {
                returnable.push(moves[i]);
                canMove = true;
              }
            }
          }
        }

        if (whiteKingPositionsOfCheck && whiteKingPositionsOfCheck.length > 0) {
          if (
            checkPossibleMovesInCheck(
              item,
              board,
              row,
              col,
              whiteKingPositionsOfCheck
            ).length > 0 ||
            canMove
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      type: ItemTypes.ROOK,
      item: {
        piece: "white_rook",
        row: row,
        col: col,
        availableMovesInCheck: returnable,
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [canMove, whiteKingPositionsOfCheck]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={WhiteRookSVG}></DragPreviewImage>
      <div ref={drag} style={{ opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <g
            opacity="1"
            fill="#ffffff"
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
              d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
              strokeLinecap="butt"
            />
            <path
              d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
              strokeLinecap="butt"
            />
            <path
              d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
              strokeLinecap="butt"
            />
            <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
            <path
              d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
            <path
              d="M 11,14 L 34,14"
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
