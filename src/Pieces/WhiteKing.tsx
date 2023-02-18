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
import WhiteKingSVG from "./svgs/white_king.svg";

export default function WhiteKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
  pieceType,
  pieceSVG
}: IKingPiece) {
  const { whiteKingPositionsOnTheDirectionOfCheck, whiteKingPositionsOfCheck } = kingsChecks;
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
            possibleInterveningMoves.push(...pawnMoves.filter(move =>
              whiteKingPositionsOnTheDirectionOfCheck.some(position =>
                move.row === position.row && move.column === position.column
              )
            ));
          }
        } else if (incomingPiece === "knight") {
          let knightMoves = canKnightMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (knightMoves && whiteKingPositionsOfCheck) {
            possibleInterveningMoves = knightMoves.filter(move =>
              whiteKingPositionsOnTheDirectionOfCheck.some(pos =>
                move.row === pos.row && move.column === pos.column
              )
            );
          }
        } else if (incomingPiece === "bishop") {
          let bishopMoves = canBishopMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (bishopMoves && whiteKingPositionsOfCheck) {
            possibleInterveningMoves.push(
              ...bishopMoves.filter(move =>
                whiteKingPositionsOnTheDirectionOfCheck.some(pos =>
                  move.row === pos.row && move.column === pos.column
                )
              )
            );
          }
        } else if (incomingPiece === "rook") {
          let rookMoves = canRookMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (rookMoves && whiteKingPositionsOfCheck) {
             possibleInterveningMoves = rookMoves.filter(move => {
              return whiteKingPositionsOnTheDirectionOfCheck.some(kingPos => {
                return move.row === kingPos.row && move.column === kingPos.column;
              });
            });
          }
        } else if (incomingPiece === "queen") {
          let queenMoves = canQueenMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          });

          if (queenMoves && whiteKingPositionsOfCheck) {
            possibleInterveningMoves = queenMoves.filter(move => {
              return whiteKingPositionsOnTheDirectionOfCheck.some(kingPos => {
                return move.row === kingPos.row && move.column === kingPos.column;
              });
            });
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
