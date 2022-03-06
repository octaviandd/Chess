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
import BlackKingSVG from "./black_king.svg";

export default function BlackKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
}: IKingPiece) {
  const { blackKingPositionsOnTheDirectionOfCheck, blackKingPositionsOfCheck } =
    kingsChecks;

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <g
            fill="none"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeOpacity="1"
            transform="translate(3,1) scale(1.7)"
          >
            <path
              d="M 22.5,11.63 L 22.5,6"
              fill="none"
              stroke="#000000"
              strokeLinejoin="miter"
            />
            <path
              d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
              fill="#000000"
              fillOpacity="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            <path
              d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
              fill="#000000"
              stroke="#000000"
            />
            <path
              d="M 20,8 L 25,8"
              fill="none"
              stroke="#000000"
              strokeLinejoin="miter"
            />
            <path
              d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
              fill="none"
              stroke="#ffffff"
            />
            <path
              d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
              fill="none"
              stroke="#ffffff"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
