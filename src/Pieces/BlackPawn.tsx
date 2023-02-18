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
import PawnSVG from "./black_pawn.svg";

export default function BlackPawn({ row, col, board, kingsChecks, pieceSVG, pieceType }: IPiece) {
  let item = "black_pawn";
  let moves = canPawnMove({ board, row, col, pieceColor: "black" }).moves;
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;
  let isKingBehind: boolean = false;

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

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (blackKingDefendingPieces) {
          for (let i = 0; i < blackKingDefendingPieces.length; i++) {
            const defendingPiece = blackKingDefendingPieces[i];
            if (defendingPiece.row === row && defendingPiece.column === col) {
              const { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, "black");

              if (directionOfPinning !== "") {
                isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, "black");
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

        if (blackKingPositionsOfCheck?.length) {
          return checkPossibleMovesInCheck(item, board, row, col, blackKingPositionsOfCheck).length > 0 || canMove;
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
    [blackKingPositionsOfCheck, canMove]
  );

  return (
    <>
      <DragPreviewImage connect={preview} src={PawnSVG} />
      <div
        ref={drag}
        style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}
      >
       <img src={pieceSVG} />
      </div>
    </>
  );
}
