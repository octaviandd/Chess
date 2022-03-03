/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import styled from "styled-components";
import {
  canPieceMoveInCheck,
  canQueenMove,
  checkPossibleMovesInCheck,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import BlackQueenSVG from "./black_queen.svg";

type Props = {
  row: number;
  col: number;
  board: any;
  kingsChecks: any;
};

export default function BlackQueen({ row, col, board, kingsChecks }: Props) {
  let item = "black_queen";
  let moves = canQueenMove(board, row, col, "black");
  let returnable: any = [];
  let canMove = false;
  let availableMovesInPinned: any = [];
  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;
  const [collectedProps, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (moves && blackKingPositionsOfCheck) {
          for (let i = 0; i < moves.length; i++) {
            for (
              let j = 0;
              j < blackKingPositionsOnTheDirectionOfCheck.length;
              j++
            ) {
              if (
                moves[i].row ===
                  blackKingPositionsOnTheDirectionOfCheck[j].row &&
                moves[i].column ===
                  blackKingPositionsOnTheDirectionOfCheck[j].column
              ) {
                returnable.push(moves[i]);
                canMove = true;
              }
            }
          }
        }

        if (blackKingDefendingPieces) {
          for (let i = 0; i < blackKingDefendingPieces.length; i++) {
            if (
              blackKingDefendingPieces[i].row === row &&
              blackKingDefendingPieces[i].column === col
            ) {
              let { isPinned, attackingPiece } = canPieceMoveInCheck(
                board,
                row,
                col,
                "black"
              );
              if (attackingPiece.length > 0) {
                for (let i = 0; i < moves.length; i++) {
                  for (let j = 0; j < attackingPiece.length; j++) {
                    if (
                      moves[i].row === attackingPiece[j].row &&
                      moves[i].column === attackingPiece[j].column
                    ) {
                      availableMovesInPinned.push(moves[i]);
                    }
                  }
                }
              } else {
                return !isPinned;
              }
            }
          }
        }

        if (blackKingPositionsOfCheck && blackKingPositionsOfCheck.length > 0) {
          if (
            checkPossibleMovesInCheck(
              item,
              board,
              row,
              col,
              blackKingPositionsOfCheck
            ).length > 0 ||
            canMove
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      type: ItemTypes.PAWN,
      item: {
        piece: "black_queen",
        row: row,
        col: col,
        availableMovesInCheck: returnable,
        availableMovesInPinned,
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [canMove, blackKingPositionsOfCheck]
  );
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={BlackQueenSVG}
      ></DragPreviewImage>
      <div
        ref={drag}
        style={{ opacity: collectedProps.isDragging ? 0.5 : 1, cursor: "move" }}
      >
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 80 80"
        >
          <g
            opacity="1"
            fill="000000"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeOpacity="1"
            transform="scale(1.6) translate(3, 1)"
          >
            <g fill="#000000" stroke="none">
              <circle cx="6" cy="12" r="2.75" />
              <circle cx="14" cy="9" r="2.75" />
              <circle cx="22.5" cy="8" r="2.75" />
              <circle cx="31" cy="9" r="2.75" />
              <circle cx="39" cy="12" r="2.75" />
            </g>
            <path
              d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
              strokeLinecap="butt"
              stroke="#000000"
            />
            <path
              d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
              strokeLinecap="butt"
            />
            <path
              d="M 11,38.5 A 35,35 1 0 0 34,38.5"
              fill="none"
              stroke="#000000"
              strokeLinecap="butt"
            />
            <path
              d="M 11,29 A 35,35 1 0 1 34,29"
              fill="none"
              stroke="#ffffff"
            />
            <path d="M 12.5,31.5 L 32.5,31.5" fill="none" stroke="#ffffff" />
            <path
              d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
              fill="none"
              stroke="#ffffff"
            />
            <path
              d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
              fill="none"
              stroke="#ffffff"
            />
          </g>
        </SVG>
      </div>
    </>
  );
}

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;
