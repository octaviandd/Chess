/** @format */

import { DragPreviewImage, useDrag } from "react-dnd";
import {
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
  canPieceMove
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { ISquare } from "../types";

export default function BlackPiece({ row, col, board, kingsChecks, pieceColor, pieceType, pieceSVG }: any) {
  let moves : any = canPieceMove(board, row, col, pieceColor, pieceType);
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  let isKingBehind: boolean = false;

  const kingPositionsOfCheck = pieceColor === 'black' ? kingsChecks.blackKingPositionsOfCheck : kingsChecks.whiteKingPositionsOfCheck;
  const kingPositionsOnTheDirectionOfCheck = pieceColor === 'black' ? kingsChecks.blackKingPositionsOnTheDirectionOfCheck : kingsChecks.whiteKingPositionsOnTheDirectionOfCheck;
  const kingDefendingPieces = pieceColor === 'black' ? kingsChecks.blackKingDefendingPieces : kingsChecks.whiteKingDefendingPieces;

  const handleCanDrag = () => {
    if (moves && kingPositionsOfCheck) {
      for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < kingPositionsOnTheDirectionOfCheck.length; j++) {
          if (moves[i].row === kingPositionsOnTheDirectionOfCheck[j].row && moves[i].column === kingPositionsOnTheDirectionOfCheck[j].column) {
            availableMovesInCheck.push(moves[i]);
            canMove = true;
          }
        }
      }
    }

    if (kingDefendingPieces) {
      for (let i = 0; i < kingDefendingPieces.length; i++) {
        if (kingDefendingPieces[i].row === row && kingDefendingPieces[i].column === col) {
          let { isPinned, attackingPiece, directionOfPinning } = canPieceMoveInCheck(board, row, col, pieceColor);
          if (directionOfPinning !== "") {
            isKingBehind = isKingBehindDirection(directionOfPinning, board, row, col, pieceColor);
          }

          if (attackingPiece.length > 0) {
            for (let i = 0; i < moves.length; i++) {
              for (let j = 0; j < attackingPiece.length; j++) {
                if (moves[i].row === attackingPiece[j].row && moves[i].column === attackingPiece[j].column) {
                  availableMovesInPinned.push(moves[i]);
                }
              }
            }
          }

          if (isPinned && availableMovesInPinned.length < 1 && isKingBehind) {
            return false;
          }
        }
      }
    }

    if (kingPositionsOfCheck && kingPositionsOfCheck.length > 0) {
      if (checkPossibleMovesInCheck(pieceType, board, row, col, kingPositionsOfCheck).length > 0 || canMove) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
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
