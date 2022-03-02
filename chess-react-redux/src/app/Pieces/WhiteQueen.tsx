/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { canQueenMove, checkPossibleMovesInCheck } from "../../game";
import { ItemTypes } from "../../ItemTypes";
import WhiteQueenSVG from "./white_queen.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

export default function WhiteQueen({ row, col, board, kingsChecks }: Props) {
  let item = "white_queen";
  let moves = canQueenMove(board, row, col, "white");
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
        console.log({
          returnable,
          whiteKingPositionsOfCheck,
          whiteKingPositionsOnTheDirectionOfCheck,
        });

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
      type: ItemTypes.QUEEN,
      item: {
        piece: "white_queen",
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
      <DragPreviewImage
        connect={preview}
        src={WhiteQueenSVG}
      ></DragPreviewImage>
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
              d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
              transform="translate(-1,-1)"
            />
            <path
              d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
              transform="translate(15.5,-5.5)"
            />
            <path
              d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
              transform="translate(32,-1)"
            />
            <path
              d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
              transform="translate(7,-4.5)"
            />
            <path
              d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
              transform="translate(24,-4)"
            />
            <path
              d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
              strokeLinecap="butt"
            />
            <path
              d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
              strokeLinecap="butt"
            />
            <path d="M 11.5,30 C 15,29 30,29 33.5,30" fill="none" />
            <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" fill="none" />
          </g>
        </svg>
      </div>
    </>
  );
}
