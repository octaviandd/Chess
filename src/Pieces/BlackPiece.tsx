/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { BlackRookSVG } from "./BlackRookSVG";
import {
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
  canPieceMove
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { ISquare } from "../types";
import { BlackQueenSVG } from "./BlackQueenSVG";
import BlackPawnSVG from "./BlackPawnSVG";
import { BlackKnightSVG } from "./BlackKnightSVG";
import { BlackKingSVG } from "./BlackKingSVG";
import BlackBishopSVG from "./BlackBishopSVG";

export default function BlackPiece({ row, col, board, kingsChecks, pieceColor, pieceType, PieceSVG }: any) {
  let moves : any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;
  let isKingBehind: boolean = false;

  if (pieceType === "black_pawn") {
    if (moves && blackKingPositionsOfCheck) {
      for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < blackKingPositionsOnTheDirectionOfCheck.length; j++) {
          if (
            moves[i].row === blackKingPositionsOnTheDirectionOfCheck[j].row &&
            moves[i].column === blackKingPositionsOnTheDirectionOfCheck[j].column
          ) {
            availableMovesInCheck.push(moves[i]);
            canMove = true;
          }
        }
      }
    }
  }


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
                availableMovesInCheck.push(moves[i]);
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
              pieceType,
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
        piece: pieceType,
        row: row,
        col: col,
        availableMovesInCheck,
        availableMovesInPinned: isKingBehind ? availableMovesInPinned : [],
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [canMove, blackKingPositionsOfCheck]
  );

  const decidePiece = () => {
    switch (pieceType) {
      case "black_rook":
        return <BlackRookSVG />;
      case "black_knight":
        return <BlackKnightSVG />;
      case "black_bishop":
        return <BlackBishopSVG />;
      case "black_queen":
        return <BlackQueenSVG />;
      case "black_king":
        return <BlackKingSVG />;
      case "black_pawn":
        return <BlackPawnSVG />;
      default:
        return false
      }
    }

  return (
    <>
      <DragPreviewImage connect={preview} src={PieceSVG}></DragPreviewImage>
      <div ref={drag} style={{ opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        {decidePiece()}
      </div>
    </>
  );
}
