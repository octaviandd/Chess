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
import { IKingChecks, IKingPiece, IPiece, ISquare } from "../types";

export default function WhiteKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
  pieceType,
  pieceColor,
  pieceSVG
}: IKingPiece) {
  let possibleMoves = canKingMove({ board, row, col, pieceColor });
  let possibleAttackingMoves: ISquare[] = [];
  let moves: ISquare[] = [];
  let possibleInterveningMoves: ISquare[] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece !== null && board[i][j].piece?.includes(pieceColor)) {
        let pieceColor: string = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          let pawnMoves = canPawnMove({
            board,
            row: board[i][j].row,
            col: board[i][j].column,
            pieceColor,
          }).moves;
          if (pawnMoves && kingsChecks.whiteKingPositionsOfCheck) {
            possibleInterveningMoves.push(...pawnMoves.filter(move =>
              kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.some(position =>
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

          if (knightMoves && kingsChecks.whiteKingPositionsOfCheck) {
            possibleInterveningMoves = knightMoves.filter(move =>
              kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.some(pos =>
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

          if (bishopMoves && kingsChecks.whiteKingPositionsOfCheck) {
            possibleInterveningMoves.push(
              ...bishopMoves.filter(move =>
                kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.some(pos =>
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

          if (rookMoves && kingsChecks.whiteKingPositionsOfCheck) {
             possibleInterveningMoves = rookMoves.filter(move => {
              return kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.some(kingPos => {
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

          if (queenMoves && kingsChecks.whiteKingPositionsOfCheck) {
            possibleInterveningMoves = queenMoves.filter(move => {
              return kingsChecks.whiteKingPositionsOnTheDirectionOfCheck.some(kingPos => {
                return move.row === kingPos.row && move.column === kingPos.column;
              });
            });
          }
        }
      }
      if (board[i][j].piece != null && !board[i][j].piece?.includes(pieceColor)) {
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
        piece: pieceType,
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
      <DragPreviewImage connect={preview} src={pieceSVG}></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
        <img src={pieceSVG} alt="white king" />
      </div>
    </>
  );
}
