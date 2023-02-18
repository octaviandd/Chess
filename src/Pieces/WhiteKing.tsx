/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canBishopMove,
  canKingMove,
  canKnightMove,
  canPawnMove,
  canPieceMoveInCheck,
  canQueenMove,
  canRookMove,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IKingChecks, IKingPiece, IPiece, ISquare } from "../types";
import WhiteKingSVG from "./white_king.svg";

export default function WhiteKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
  pieceType,
  pieceSVG
}: IKingPiece) {
  const { whiteKingPositionsOnTheDirectionOfCheck, whiteKingPositionsOfCheck } =
    kingsChecks;

  let possibleMoves = canKingMove({ board, row, col, pieceColor: "white" });
  let possibleAttackingMoves: ISquare[] = [];
  let moves: ISquare[] = [];
  let possibleInterveningMoves: ISquare[] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece !== null && board[i][j].piece?.includes("white")) {
        let pieceColor: string = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          let pawnMoves = canPawnMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).moves;
          if (pawnMoves && whiteKingPositionsOfCheck) {
            for (let i = 0; i < pawnMoves.length; i++) {
              for (
                let j = 0;
                j < whiteKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  pawnMoves[i].row ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                  pawnMoves[i].column ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(pawnMoves[i]);
                }
              }
            }
          }
        } else if (incomingPiece === "knight") {
          let knightMoves = canKnightMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (knightMoves && whiteKingPositionsOfCheck) {
            for (let i = 0; i < knightMoves.length; i++) {
              for (
                let j = 0;
                j < whiteKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  knightMoves[i].row ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                  knightMoves[i].column ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(knightMoves[i]);
                }
              }
            }
          }
        } else if (incomingPiece === "bishop") {
          let bishopMoves = canBishopMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (bishopMoves && whiteKingPositionsOfCheck) {
            for (let i = 0; i < bishopMoves.length; i++) {
              for (
                let j = 0;
                j < whiteKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  bishopMoves[i].row ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                  bishopMoves[i].column ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(bishopMoves[i]);
                }
              }
            }
          }
        } else if (incomingPiece === "rook") {
          let rookMoves = canRookMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (rookMoves && whiteKingPositionsOfCheck) {
            for (let i = 0; i < rookMoves.length; i++) {
              for (
                let j = 0;
                j < whiteKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  rookMoves[i].row ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                  rookMoves[i].column ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(rookMoves[i]);
                }
              }
            }
          }
        } else if (incomingPiece === "queen") {
          let queenMoves = canQueenMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (queenMoves && whiteKingPositionsOfCheck) {
            for (let i = 0; i < queenMoves.length; i++) {
              for (
                let j = 0;
                j < whiteKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  queenMoves[i].row ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].row &&
                  queenMoves[i].column ===
                    whiteKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(queenMoves[i]);
                }
              }
            }
          }
        }
      }
      if (board[i][j].piece != null && !board[i][j].piece?.includes("white")) {
        let pieceColor: string = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          canPawnMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).protectedSquares.map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "knight") {
          canKnightMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "bishop") {
          canBishopMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "rook") {
          canRookMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "king") {
          canKingMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "queen") {
          canQueenMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).map((item) => possibleAttackingMoves.push(item));
        }
      }
    }
  }

  let newSet: ISquare[] = Array.from(new Set(possibleAttackingMoves));

  moves = possibleMoves.filter(
    (o) =>
      !newSet.some((i: ISquare) => i.row === o.row && i.column === o.column)
  );

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves.length < 1 && possibleInterveningMoves.length < 1) {
          setKingChecks((prevState: IKingChecks) => ({
            ...prevState,
            whiteCheckMated: true,
          }));
          return false;
        } else {
          return true;
        }
      },
      type: ItemTypes.KING,
      item: {
        piece: "white_king",
        row: row,
        col: col,
        availableMovesInCheck: moves,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [possibleMoves, possibleAttackingMoves, moves]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={WhiteKingSVG}></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
        <img src={pieceSVG} alt="white king" />
      </div>
    </>
  );
}
