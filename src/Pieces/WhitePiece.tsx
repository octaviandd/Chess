/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPieceMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IPiece, ISquare } from "../types";
import { WhiteBishopSVG } from "./WhiteBishopSVG";
import { WhiteQueenSVG } from "./WhiteQueenSVG";
import { WhiteKingSVG } from "./WhiteKingSVG";
import { WhiteRookSVG } from "./WhiteRookSVG";
import { WhitePawnSVG } from "./WhitePawnSVG";
import {WhiteKnightSVG} from "./WhiteKnightSVG";


export default function WhitePiece({ row, col, board, kingsChecks , pieceType, pieceColor, pieceSVG}: any) {
  let moves: any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;
  const {whiteKingPositionsOfCheck} = kingsChecks;

  const handleCanDrag = () => {
    let availableMovesInCheck = [];
    let canMove = false;
    let availableMovesInPinned = [];
    let isKingBehind = false;

    if (moves && kingsChecks.whiteKingPositionsOfCheck) {
      for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.length; j++) {
          if (moves[i].row === kingsChecks.whiteKingPositionsOnTheDirectionOfCheck[j].row && moves[i].column === kingsChecks.whiteKingPositionsOnTheDirectionOfCheck[j].column) {
            availableMovesInCheck.push(moves[i]);
            canMove = true;
          }
        }
      }
    }

    if (kingsChecks.whiteKingDefendingPieces) {
      for (let i = 0; i < kingsChecks.whiteKingDefendingPieces.length; i++) {
        if (kingsChecks.whiteKingDefendingPieces[i].row === row && kingsChecks.whiteKingDefendingPieces[i].column === col) {
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

    if (kingsChecks.whiteKingPositionsOfCheck && kingsChecks.whiteKingPositionsOfCheck.length > 0) {
      if (checkPossibleMovesInCheck(pieceType, board, row, col, kingsChecks.whiteKingPositionsOfCheck).length > 0 || canMove) {
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
    [canMove, whiteKingPositionsOfCheck]
  );

  const decidePiece = () => {
    switch (pieceType) {
      case "white_rook":
        return <WhiteRookSVG />;
      case "white_knight":
        return <WhiteKnightSVG />;
      case "white_bishop":
        return <WhiteBishopSVG />;
      case "white_queen":
        return <WhiteQueenSVG />;
      case "white_king":
        return <WhiteKingSVG />;
      case "white_pawn":
        return <WhitePawnSVG />;
      default:
        return false
      }
    }
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG}></DragPreviewImage>
      <div ref={drag} style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        {decidePiece()}
      </div>
    </>
  );
}
