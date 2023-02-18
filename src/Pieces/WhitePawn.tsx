/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPawnMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IPiece, ISquare } from "../types";
import WhitePawnSVG from "./white_pawn.svg";

export default function WhitePawn({ row, col, board, kingsChecks, pieceSVG }: IPiece) {
  let item = "white_pawn";
  let moves = canPawnMove({ board, row, col, pieceColor: "white" }).moves;
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;

  const {
    whiteKingPositionsOfCheck,
    whiteKingPositionsOnTheDirectionOfCheck,
    whiteKingDefendingPieces,
  } = kingsChecks;

   if (moves && whiteKingPositionsOfCheck) {
    for (const move of moves) {
      if (whiteKingPositionsOnTheDirectionOfCheck.some(
        position => move.row === position.row && move.column === position.column
      )) {
        availableMovesInCheck.push(move);
        canMove = true;
      }
    }
  }

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
       if (whiteKingDefendingPieces) {
        for (let i = 0; i < whiteKingDefendingPieces.length; i++) {
          const defendingPiece = whiteKingDefendingPieces[i];
          if (defendingPiece.row === row && defendingPiece.column === col) {
            const { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, "white");

            if (directionOfPinning !== "") {
              isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, "white");
            }

            if (attackingPiece.length > 0) {
              availableMovesInPinned = moves.filter(move => attackingPiece.some(piece => piece.row === move.row && piece.column === move.column));
            }

            if (isPinned && availableMovesInPinned.length === 0 && isKingBehind) {
              return false;
            }
          }
        }
      }

      if (whiteKingPositionsOfCheck?.length) {
        return checkPossibleMovesInCheck(item, board, row, col, whiteKingPositionsOfCheck).length > 0 || canMove;
        } else {
          return true;
        }
      },

      type: ItemTypes.PAWN,
      item: {
        piece: item,
        row: row,
        col: col,
        availableMovesInCheck,
        availableMovesInPinned: isKingBehind ? availableMovesInPinned : [],
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
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
       <img src={pieceSVG} />
      </div>
    </>
  );
}
