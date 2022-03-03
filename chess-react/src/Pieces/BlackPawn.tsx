/** @format */

import React, { useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import {
  canPawnMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import PawnSVG from "./black_pawn.svg";

const style = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

const isKingBehindDirection = (
  direction: string,
  board: any,
  i: number,
  j: number
) => {
  if (direction === "diagonal_bottom_left_to_right") {
    let spaceToRight = 7 - j;
    let pieceColor = "black";
    let isKingBehind = false;

    let x = 0;
    while (x < i && x < spaceToRight) {
      x++;
      if (board[i - x][j + x].piece !== null) {
        if (board[i - x][j + x].piece.includes(pieceColor)) {
          if (board[i - x][j + x] === "black_king") {
            isKingBehind = true;
          }
        }
      }
    }
    return isKingBehind;
  }
};

export default function BlackPawn({ row, col, board, kingsChecks }: Props) {
  let item = "black_pawn";
  let moves = canPawnMove(board, row, col, "black");
  let returnable: any = [];
  let canMove = false;
  let availableMovesInPinned: any = [];

  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;

  if (moves && blackKingPositionsOfCheck) {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < blackKingPositionsOnTheDirectionOfCheck.length; j++) {
        if (
          moves[i].row === blackKingPositionsOnTheDirectionOfCheck[j].row &&
          moves[i].column === blackKingPositionsOnTheDirectionOfCheck[j].column
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
        let isKingBehind: any = false;
        if (blackKingDefendingPieces) {
          for (let i = 0; i < blackKingDefendingPieces.length; i++) {
            if (
              blackKingDefendingPieces[i].row === row &&
              blackKingDefendingPieces[i].column === col
            ) {
              let { isPinned, attackingPiece, directionOfPinning } =
                canPieceMoveInCheck(board, row, col, "black");

              if (directionOfPinning !== "") {
                isKingBehind = isKingBehindDirection(
                  directionOfPinning,
                  board,
                  row,
                  col
                );
              }

              console.log({ isPinned, attackingPiece, directionOfPinning });
              if (attackingPiece.length > 0) {
                for (let i = 0; i < moves.length; i++) {
                  if (
                    moves[i].row === attackingPiece[0].row &&
                    moves[i].column === attackingPiece[0].column
                  ) {
                    availableMovesInPinned.push(moves[i]);
                  }
                }
              }
              if (
                isPinned &&
                availableMovesInPinned.length < 1 &&
                isKingBehind
              ) {
                return false;
              }
            }
          }
        }

        if (blackKingPositionsOfCheck && blackKingPositionsOfCheck.length > 0) {
          if (
            checkPossibleMovesInCheck(
              item,
              board,
              row,
              col,
              blackKingPositionsOfCheck
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
        piece: "black_pawn",
        row: row,
        col: col,
        availableMovesInCheck: returnable,
        availableMovesInPinned,
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [blackKingPositionsOfCheck, canMove]
  );

  return (
    <>
      <DragPreviewImage connect={preview} src={PawnSVG} />
      <div
        ref={drag}
        style={{ ...style, opacity: collectedProps.isDragging ? 0.5 : 1 }}
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
              fill="#000000"
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
