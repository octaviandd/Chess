/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canBishopMove,
  canKingMove,
  canKnightMove,
  canPawnMove,
  canQueenMove,
  canRookMove,
} from "../../game";
import { ItemTypes } from "../../ItemTypes";
import WhiteKingSVG from "./white_king.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

export default function WhiteKing({ row, col, board, kingsChecks }: Props) {
  const { whiteKingPositionsOnTheDirectionOfCheck, whiteKingPositionsOfCheck } =
    kingsChecks;

  let possibleMoves = canKingMove(board, row, col, "white");
  let possibleAttackingMoves: any = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece != null && !board[i][j].piece.includes("white")) {
        let pieceColor = board[i][j].piece.split("_")[0];
        let incomingPiece = board[i][j].piece.split("_")[1];
        if (incomingPiece === "pawn") {
          canPawnMove(
            board,
            board[i][j].row,
            board[i][j].column,
            pieceColor
          ).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "knight") {
          canKnightMove(board, board[i][j].row, board[i][j].column).map(
            (item) => possibleAttackingMoves.push(item)
          );
        } else if (incomingPiece === "bishop") {
          canBishopMove(
            board,
            board[i][j].row,
            board[i][j].column,
            pieceColor
          ).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "rook") {
          canRookMove(
            board,
            board[i][j].row,
            board[i][j].column,
            pieceColor
          ).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "king") {
          canKingMove(
            board,
            board[i][j].row,
            board[i][j].column,
            pieceColor
          ).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "queen") {
          canQueenMove(
            board,
            board[i][j].row,
            board[i][j].column,
            pieceColor
          ).map((item) => possibleAttackingMoves.push(item));
        }
      }
    }
  }

  console.log({ possibleAttackingMoves });
  // console.log("before");

  for (let i = 0; i < possibleMoves.length; i++) {
    for (let j = 0; j < possibleAttackingMoves.length; j++) {
      // console.log(possibleMoves, i);
      if (possibleAttackingMoves[j] && possibleMoves[i]) {
        if (
          possibleAttackingMoves[j].row === possibleMoves[i].row &&
          possibleAttackingMoves[j].column === possibleMoves[i].column
        ) {
          possibleMoves.splice(i, 1);
        }
      }
    }
  }

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        return true;
      },
      type: ItemTypes.KING,
      item: {
        piece: "white_king",
        row: row,
        col: col,
        availableMovesInCheck: possibleMoves,
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [possibleMoves, possibleAttackingMoves]
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
