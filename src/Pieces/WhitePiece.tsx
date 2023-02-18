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
  let item = "white_knight";
  let moves: any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;
  const {
    whiteKingPositionsOnTheDirectionOfCheck,
    whiteKingPositionsOfCheck,
    whiteKingDefendingPieces,
  } = kingsChecks;

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves && whiteKingPositionsOfCheck) {
          for (let i = 0; i < moves.length; i++) {
            for (
              let j = 0;
              j < whiteKingPositionsOnTheDirectionOfCheck.length;
              j++
            ) {
              if (
                moves[i].row ===
                  whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                moves[i].column ===
                  whiteKingPositionsOnTheDirectionOfCheck[j].column
              ) {
                availableMovesInCheck.push(moves[i]);
                canMove = true;
              }
            }
          }
        }

        if (whiteKingDefendingPieces) {
          for (let i = 0; i < whiteKingDefendingPieces.length; i++) {
            if (
              whiteKingDefendingPieces[i].row === row &&
              whiteKingDefendingPieces[i].column === col
            ) {
              let { isPinned, attackingPiece, directionOfPinning } =
                canPieceMoveInCheck(board, row, col, pieceColor);

              if (directionOfPinning !== "") {
                isKingBehind = isKingBehindDirection(
                  directionOfPinning,
                  board,
                  row,
                  col,
                  pieceColor
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
      <DragPreviewImage connect={preview} src={pieceSVG}
      ></DragPreviewImage>
      <div ref={drag} style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        {decidePiece()}
      </div>
    </>
  );
}