/** @format */

import { useDrag, DragPreviewImage } from "react-dnd";
import {
  canPawnMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../types";
import { IPiece, ISquare } from "../types";

export default function BlackPawn({ row, col, board, kingsChecks, pieceColor, pieceSVG, pieceType }: IPiece) {
  let moves = canPawnMove({ board, row, col, pieceColor }).moves;
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;

  const { 
    [pieceColor === 'black' ? 'blackKingPositionsOfCheck' : 'whiteKingPositionsOfCheck']: kingPositionsOfCheck,
    [pieceColor === 'black' ? 'blackKingPositionsOnTheDirectionOfCheck' : 'whiteKingPositionsOnTheDirectionOfCheck']: kingPositionsOnTheDirectionOfCheck,
    [pieceColor === 'black' ? 'blackKingDefendingPieces' : 'whiteKingDefendingPieces']: kingDefendingPieces
  } = kingsChecks;

  if (moves && kingPositionsOfCheck) {
    availableMovesInCheck = moves.filter(move => 
      kingPositionsOnTheDirectionOfCheck.some(pos => 
        pos.row === move.row && pos.column === move.column
      )
    );
    canMove = availableMovesInCheck.length > 0;
  }

  const [collectedProps, drag, preview] = useDrag(() => ({
    type: ItemTypes.PAWN,
    canDrag: () => {
      // Check if piece is pinned
      if (kingDefendingPieces?.some(piece => piece.row === row && piece.column === col)) {
        const { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, pieceColor);
        isKingBehind = typeof directionOfPinning === 'string' && isKingBehindDirection(directionOfPinning, board, row, col, pieceColor);
        
        if (attackingPiece.length > 0) {
          availableMovesInPinned = moves.filter(move => 
            attackingPiece.some(piece => piece.row === move.row && piece.column === move.column)
          );
        }

        if (isPinned && availableMovesInPinned.length === 0 && isKingBehind) {
          return false;
        }
      }

      // Check if king is in check
      return kingPositionsOfCheck?.length
        ? checkPossibleMovesInCheck(pieceType, board, row, col, kingPositionsOfCheck).length > 0 || canMove
        : true;
    },
    item: {
      piece: pieceType,
      row,
      col,
      availableMovesInCheck,
      availableMovesInPinned: isKingBehind ? availableMovesInPinned : [],
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [kingPositionsOfCheck, canMove]);

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG} />
      <div
        ref={drag}
        style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}
      >
       <img src={pieceSVG} />
      </div>
    </>
  );
}
