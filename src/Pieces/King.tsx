/** @format */

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

export default function BlackKing({
  row,
  col,
  board,
  kingsChecks,
  setKingChecks,
  pieceColor,
  pieceType,
  pieceSVG
}: IKingPiece) {
  let possibleMoves = canKingMove({ board, row, col, pieceColor });
  let possibleAttackingMoves: ISquare[] = [];
  let possibleInterveningMoves: ISquare[] = [];
  let moves: ISquare[] = [];

  const addPossibleMoves = (moves: any) => {
    const kingPositionsOfCheck = pieceColor === 'black' ? kingsChecks.blackKingPositionsOfCheck : kingsChecks.whiteKingPositionsOfCheck;
    const kingPositionsOnTheDirectionOfCheck = pieceColor === 'black' ? kingsChecks.blackKingPositionsOnTheDirectionOfCheck : kingsChecks.whiteKingPositionsOnTheDirectionOfCheck;

    if (moves && kingPositionsOfCheck) {
      possibleInterveningMoves.push(...moves.filter((move: any) =>
        kingPositionsOnTheDirectionOfCheck.some(position =>
          move.row === position.row && move.column === position.column
        )
      ));
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece && board[i][j].piece?.includes(pieceColor)) {
        let pieceColor = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          addPossibleMoves(canPawnMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}).moves);
        } else if (incomingPiece === "knight") {
          addPossibleMoves(canKnightMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}));
        } else if (incomingPiece === "bishop") {
          addPossibleMoves(canBishopMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}));
        } else if (incomingPiece === "rook") {
          addPossibleMoves(canRookMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}));
        } else if (incomingPiece === "queen") {
          addPossibleMoves(canQueenMove({ board, row: board[i][j].row, col: board[i][j].column, pieceColor}));
        }
      }

      if (board[i][j].piece && !board[i][j].piece?.includes(pieceColor)) {
        let pieceColor = board[i][j].piece?.split("_")[0]!;
        let incomingPiece = board[i][j].piece?.split("_")[1];
        if (incomingPiece === "pawn") {
          canPawnMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}).protectedSquares.map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "knight") {
          canKnightMove({ board, row: board[i][j].row, col: board[i][j].column, pieceColor}).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "bishop") {
          canBishopMove({ board, row: board[i][j].row, col: board[i][j].column, pieceColor}).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "rook") {
          canRookMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "king") {
          canKingMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}).map((item) => possibleAttackingMoves.push(item));
        } else if (incomingPiece === "queen") {
          canQueenMove({board, row: board[i][j].row, col: board[i][j].column, pieceColor}).map((item) => possibleAttackingMoves.push(item));
        }
      }
    }
  }

  moves = possibleMoves.filter(
    (o) =>
      !Array.from(new Set(possibleAttackingMoves)).some((i: ISquare) => i.row === o.row && i.column === o.column)
  );

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves.length < 1 && possibleInterveningMoves.length < 1) {
          setKingChecks((prevState: IKingChecks) => ({
            ...prevState,
            [pieceColor === "white" ? "whiteCheckMated" : "blackCheckMated"]: true,
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
      end: () => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [possibleMoves, possibleAttackingMoves]
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG}></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
       <img src={pieceSVG} />
      </div>
    </>
  );
}
