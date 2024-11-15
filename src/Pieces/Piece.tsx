/** @format */

import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
  canPieceMove
} from "../game";
import { ItemTypes } from "../types";
import { ISquare } from "../types";

export default function Piece({ row, col, board, kingsChecks, pieceColor, pieceType, pieceSVG }: any) {
  let moves : any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;

  const {
    [`${pieceColor}KingPositionsOfCheck`]: kingPositionsOfCheck,
    [`${pieceColor}KingPositionsOnTheDirectionOfCheck`]: kingPositionsOnTheDirectionOfCheck,
    [`${pieceColor}KingDefendingPieces`]: kingDefendingPieces
  } = kingsChecks;

  const handleCanDrag = () => {
    if (moves && kingPositionsOfCheck) {
      availableMovesInCheck = moves.filter((move: { row: any; column: any; }) => 
      kingPositionsOnTheDirectionOfCheck.some((pos: { row: any; column: any; }) => 
        pos.row === move.row && pos.column === move.column
      )
      );
      canMove = availableMovesInCheck.length > 0;
    }

    if (kingDefendingPieces?.some((piece: { row: any; column: any; }) => piece.row === row && piece.column === col)) {
      const { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, pieceColor);
      
      if (directionOfPinning) {
        isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, pieceColor);
      }

      if (attackingPiece.length > 0) {
        availableMovesInPinned = moves.filter((move: { row: any; column: any; }) => 
          attackingPiece.some(attacker => attacker.row === move.row && attacker.column === move.column)
        );
      }

      if (isPinned && availableMovesInPinned.length === 0 && isKingBehind) {
      return false;
      }
    }

    if (!kingPositionsOfCheck?.length) return true;
    return checkPossibleMovesInCheck(pieceType, board, row, col, kingPositionsOfCheck).length > 0 || canMove;
  };

  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: handleCanDrag,
      type: ItemTypes.ROOK,
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
    [canMove, kingPositionsOfCheck]
  );

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceSVG}></DragPreviewImage>
      <div ref={drag} style={{ opacity: collectedProps.isDragging ? 0.5 : 1 }}>
        <img src={pieceSVG}/>
      </div>
    </>
  );
}
