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
import { ItemTypes } from "../types";
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

  const addPossibleMoves = (moves: ISquare[]) => {
    const { blackKingPositionsOfCheck, whiteKingPositionsOfCheck, blackKingPositionsOnTheDirectionOfCheck, whiteKingPositionsOnTheDirectionOfCheck } = kingsChecks;
    const kingPositionsOfCheck = pieceColor === 'black' ? blackKingPositionsOfCheck : whiteKingPositionsOfCheck;
    const kingPositionsOnTheDirectionOfCheck = pieceColor === 'black' ? blackKingPositionsOnTheDirectionOfCheck : whiteKingPositionsOnTheDirectionOfCheck;

    if (moves && kingPositionsOfCheck) {
      possibleInterveningMoves.push(...moves.filter(move =>
        kingPositionsOnTheDirectionOfCheck.some(position =>
          move.row === position.row && move.column === position.column
        )
      ));
    }
  }

  const pieceMoves = {
    pawn: canPawnMove,
    knight: canKnightMove,
    bishop: canBishopMove,
    rook: canRookMove,
    queen: canQueenMove,
    king: canKingMove,
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j].piece;
      if (piece) {
        const [color, type] = piece.split("_");
        const moveFunction = pieceMoves[type as keyof typeof pieceMoves];
        if (moveFunction) {
          const moves = moveFunction({ board, row: board[i][j].row, col: board[i][j].column, pieceColor: color });
          if (color === pieceColor) {
            addPossibleMoves(Array.isArray(moves) ? moves : moves.moves || []);
          } else {
            (Array.isArray(moves) ? moves : moves.protectedSquares).forEach((item: ISquare) => possibleAttackingMoves.push(item));
          }
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
