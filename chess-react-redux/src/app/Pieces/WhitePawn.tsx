/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPawnMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
} from "../../game";
import { ItemTypes } from "../../ItemTypes";
import WhitePawnSVG from "./white_pawn.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};
export default function WhitePawn({ row, col, board, kingsChecks }: Props) {
  let item = "white_pawn";
  let moves = canPawnMove(board, row, col, "white");
  let returnable: any = [];
  let canMove = false;

  const {
    whiteKingPositionsOfCheck,
    whiteKingPositionsOnTheDirectionOfCheck,
    whiteKingDefendingPieces,
  } = kingsChecks;

  if (moves && whiteKingPositionsOfCheck) {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < whiteKingPositionsOnTheDirectionOfCheck.length; j++) {
        if (
          moves[i].row === whiteKingPositionsOnTheDirectionOfCheck[j].row &&
          moves[i].column === whiteKingPositionsOnTheDirectionOfCheck[j].column
        ) {
          returnable.push(moves[i]);
          canMove = true;
        }
      }
    }
  }

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        // if (whiteKingDefendingPieces) {
        //   console.log(whiteKingDefendingPieces);
        //   for (let i = 0; i < whiteKingDefendingPieces.length; i++) {
        //     console.log(whiteKingDefendingPieces[i]);
        //     if (
        //       whiteKingDefendingPieces[i].row === row &&
        //       whiteKingDefendingPieces[i].column === col
        //     ) {
        //       console.log(
        //         canPieceMoveInCheck(board, row, col, "white").isPinned
        //       );
        //       return canPieceMoveInCheck(board, row, col, "white").isPinned;
        //     }
        //   }
        // }

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
      type: ItemTypes.PAWN,
      item: {
        piece: "white_pawn",
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
    [whiteKingPositionsOfCheck, canMove]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={WhitePawnSVG}></DragPreviewImage>
      <div
        style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}
        ref={drag}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <g transform="scale(1.6) translate(3, 1)">
            <path
              d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
              opacity="1"
              fill="#ffffff"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeDasharray="none"
              strokeOpacity="1"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
