/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPieceMoveInCheck,
  canRookMove,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import BlackRookSVG from "./black_rook.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

export default function BlackRook({ row, col, board, kingsChecks }: Props) {
  let item = "black_rook";
  let moves = canRookMove(board, row, col, "black");
  let returnable: any = [];
  let canMove = false;
  let availableMovesInPinned: any = [];
  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;
  let isKingBehind: any = false;
  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves && blackKingPositionsOfCheck) {
          for (let i = 0; i < moves.length; i++) {
            for (
              let j = 0;
              j < blackKingPositionsOnTheDirectionOfCheck.length;
              j++
            ) {
              if (
                moves[i].row ===
                  blackKingPositionsOnTheDirectionOfCheck[j].row &&
                moves[i].column ===
                  blackKingPositionsOnTheDirectionOfCheck[j].column
              ) {
                returnable.push(moves[i]);
                canMove = true;
              }
            }
          }
        }

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
                  col,
                  "black"
                );
              }

              if (attackingPiece.length > 0) {
                for (let i = 0; i < moves.length; i++) {
                  for (let j = 0; j < attackingPiece.length; j++) {
                    if (
                      moves[i].row === attackingPiece[j].row &&
                      moves[i].column === attackingPiece[j].column
                    ) {
                      availableMovesInPinned.push(moves[i]);
                    }
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
      type: ItemTypes.ROOK,
      item: {
        piece: "black_rook",
        row: row,
        col: col,
        availableMovesInCheck: returnable,
        availableMovesInPinned: isKingBehind ? availableMovesInPinned : [],
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [canMove, blackKingPositionsOfCheck]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={BlackRookSVG}></DragPreviewImage>
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
            fill="000000"
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
              d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
              strokeLinecap="butt"
            />
            <path
              d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
              strokeLinecap="butt"
            />
            <path
              d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            <path
              d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
              strokeLinecap="butt"
            />
            <path
              d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
              strokeLinecap="butt"
            />
            <path
              d="M 12,35.5 L 33,35.5 L 33,35.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="miter"
            />
            <path
              d="M 13,31.5 L 32,31.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="miter"
            />
            <path
              d="M 14,29.5 L 31,29.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="miter"
            />
            <path
              d="M 14,16.5 L 31,16.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="miter"
            />
            <path
              d="M 11,14 L 34,14"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="miter"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
