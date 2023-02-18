/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
  canPieceMove
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { ISquare } from "../types";

export default function BlackPiece({ row, col, board, kingsChecks, pieceColor, pieceType, pieceSVG }: any) {
  let moves : any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  const { blackKingPositionsOfCheck} = kingsChecks;
  let isKingBehind: boolean = false;

  const handleCanDrag = () => {
    let availableMovesInCheck = [];
    let canMove = false;
    let availableMovesInPinned = [];
    let isKingBehind = false;

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

    if (kingsChecks.blackKingDefendingPieces) {
      for (let i = 0; i < kingsChecks.blackKingDefendingPieces.length; i++) {
        if (kingsChecks.blackKingDefendingPieces[i].row === row && kingsChecks.blackKingDefendingPieces[i].column === col) {
          let { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, pieceColor);

          if (directionOfPinning !== "") {
            isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, pieceColor);
          }

          if (attackingPiece.length > 0) {
            for (let i = 0; i < moves.length; i++) {
              for (let j = 0; j < attackingPiece.length; j++) {
                if (moves[i].row === attackingPiece[j].row && moves[i].column === attackingPiece[j].column) {
                  availableMovesInPinned.push(moves[i]);
                }
              }
            }
          }

          if (isPinned && availableMovesInPinned.length < 1 && isKingBehind) {
            return false;
          }
        }
      }
    }

    if (kingsChecks.blackKingPositionsOfCheck && kingsChecks.blackKingPositionsOfCheck.length > 0) {
      if (checkPossibleMovesInCheck(pieceType, board, row, col, kingsChecks.blackKingPositionsOfCheck).length > 0 || canMove) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: handleCanDrag,
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

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG}></DragPreviewImage>
      <div ref={drag} style={{ opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        <img src={pieceSVG}/>
      </div>
    </>
  );
}
