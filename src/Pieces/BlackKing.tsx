/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canBishopMove,
  canKingMove,
  canKnightMove,
  canPawnMove,
  canQueenMove,
  canRookMove,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IKingChecks, IKingPiece, ISquare } from "../types";
import BlackKingSVG from "./black_king.svg";

export default function BlackKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
  pieceSVG
}: IKingPiece) {
  const { blackKingPositionsOnTheDirectionOfCheck, blackKingPositionsOfCheck } = kingsChecks;

  let possibleMoves = canKingMove({ board, row, col, pieceColor: "black" });
  let possibleAttackingMoves: ISquare[] = [];
  let possibleInterveningMoves: ISquare[] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece !== null && board[i][j].piece?.includes("black")) {
        let pieceColor: string = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          let pawnMoves = canPawnMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).moves;
          if (pawnMoves && blackKingPositionsOfCheck) {
            for (let i = 0; i < pawnMoves.length; i++) {
              for (
                let j = 0;
                j < blackKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  pawnMoves[i].row ===
                    blackKingPositionsOnTheDirectionOfCheck[j].row &&
                  pawnMoves[i].column ===
                    blackKingPositionsOnTheDirectionOfCheck[j].column
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

          if (knightMoves && blackKingPositionsOfCheck) {
            for (let i = 0; i < knightMoves.length; i++) {
              for (
                let j = 0;
                j < blackKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  knightMoves[i].row ===
                    blackKingPositionsOnTheDirectionOfCheck[j].row &&
                  knightMoves[i].column ===
                    blackKingPositionsOnTheDirectionOfCheck[j].column
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

          if (bishopMoves && blackKingPositionsOfCheck) {
            for (let i = 0; i < bishopMoves.length; i++) {
              for (
                let j = 0;
                j < blackKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  bishopMoves[i].row ===
                    blackKingPositionsOnTheDirectionOfCheck[j].row &&
                  bishopMoves[i].column ===
                    blackKingPositionsOnTheDirectionOfCheck[j].column
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

          if (rookMoves && blackKingPositionsOfCheck) {
            for (let i = 0; i < rookMoves.length; i++) {
              for (
                let j = 0;
                j < blackKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  rookMoves[i].row ===
                    blackKingPositionsOnTheDirectionOfCheck[j].row &&
                  rookMoves[i].column ===
                    blackKingPositionsOnTheDirectionOfCheck[j].column
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

          if (queenMoves && blackKingPositionsOfCheck) {
            for (let i = 0; i < queenMoves.length; i++) {
              for (
                let j = 0;
                j < blackKingPositionsOnTheDirectionOfCheck.length;
                j++
              ) {
                if (
                  queenMoves[i].row ===
                    blackKingPositionsOnTheDirectionOfCheck[j].row &&
                  queenMoves[i].column ===
                    blackKingPositionsOnTheDirectionOfCheck[j].column
                ) {
                  possibleInterveningMoves.push(queenMoves[i]);
                }
              }
            }
          }
        }
      }
      if (board[i][j].piece != null && !board[i][j].piece?.includes("black")) {
        let pieceColor = board[i][j].piece?.split("_")[0]!;
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

  let moves = possibleMoves.filter(
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
        piece: "black_king",
        row: row,
        col: col,
        availableMovesInCheck: moves,
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [possibleMoves, possibleAttackingMoves]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={BlackKingSVG}></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
       <img src={pieceSVG} alt="black king" />
      </div>
    </>
  );
}
