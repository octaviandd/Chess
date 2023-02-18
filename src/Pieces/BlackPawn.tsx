/** @format */

import React, { useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import {
  canPawnMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IPiece, ISquare } from "../types";

export default function BlackPawn({ row, col, board, kingsChecks, pieceColor, pieceSVG, pieceType }: IPiece) {
  let moves = canPawnMove({ board, row, col, pieceColor }).moves;
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;

  if (moves && kingsChecks.blackKingPositionsOfCheck) {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < kingsChecks.blackKingPositionsOnTheDirectionOfCheck.length; j++) {
        if (moves[i].row === kingsChecks.blackKingPositionsOnTheDirectionOfCheck[j].row && moves[i].column === kingsChecks.blackKingPositionsOnTheDirectionOfCheck[j].column) {
          availableMovesInCheck.push(moves[i]);
          canMove = true;
        }
      }
    }
  }

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (kingsChecks.blackKingDefendingPieces) {
          for (let i = 0; i < kingsChecks.blackKingDefendingPieces.length; i++) {
            const defendingPiece = kingsChecks.blackKingDefendingPieces[i];
            if (defendingPiece.row === row && defendingPiece.column === col) {
              const { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, pieceColor);

              if (directionOfPinning !== "") {
                isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, pieceColor);
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

        if (kingsChecks.blackKingPositionsOfCheck?.length) {
          return checkPossibleMovesInCheck(pieceType, board, row, col, kingsChecks.blackKingPositionsOfCheck).length > 0 || canMove;
        } else {
          return true;
        }
      },
      type: ItemTypes.PAWN,
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
    [kingsChecks.blackKingPositionsOfCheck, canMove]
  );

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG} />
      <div
        ref={drag}
        style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}
      >
       <img src={pieceSVG} />
      </div>
    </>
  );
}
