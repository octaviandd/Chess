/** @format */

import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import styled from "styled-components";
import {
  canBishopMove,
  canPieceMoveInCheck,
  checkPossibleMovesInCheck,
  isKingBehindDirection,
} from "../game";
import { ItemTypes } from "../ItemTypes";
import { IPiece, ISquare } from "../types";
import BlackBishopSVG from "./black_bishop.svg";

export default function BlackBishop({ row, col, kingsChecks, board }: IPiece) {
  let item = "black_bishop";
  let moves = canBishopMove({ board, row, col, pieceColor: "black" });
  let availableMovesInCheck: ISquare[] = [];
  let canMove: boolean = false;
  let availableMovesInPinned: ISquare[] = [];
  const {
    blackKingPositionsOnTheDirectionOfCheck,
    blackKingPositionsOfCheck,
    blackKingDefendingPieces,
  } = kingsChecks;
  let isKingBehind: any = false;

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
                availableMovesInCheck.push(moves[i]);
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
              let { isPinned, attackingPiece, directionOfPinning } =
                canPieceMoveInCheck(board, row, col, "black");

              if (directionOfPinning !== "") {
                isKingBehind = isKingBehindDirection(
                  directionOfPinning,
                  board,
                  row,
                  col,
                  "black"
                );
              }

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
              }

              if (
                isPinned &&
                availableMovesInPinned.length < 1 &&
                isKingBehind
              ) {
                return false;
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
      type: ItemTypes.BISHOP,
      item: {
        piece: "black_bishop",
        row: row,
        col: col,
        availableMovesInCheck,
        availableMovesInPinned: isKingBehind ? availableMovesInPinned : [],
      },
      end: (item, monitor) => {},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [blackKingPositionsOfCheck, canMove]
  );
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={BlackBishopSVG}
      ></DragPreviewImage>
      <div
        ref={drag}
        style={{ cursor: "move", opacity: collectedProps.isDragging ? 0.5 : 1 }}
      >
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 80 80"
        >
          <g
            opacity="1"
            fill="none"
            fillRule="evenodd"
            fillOpacity="1"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeOpacity="1"
            transform="translate(3,1) scale(1.7)"
          >
            <g fill="#000000" stroke="#000000" strokeLinecap="butt">
              <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
              <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
              <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
            </g>
            <path
              d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
              fill="none"
              stroke="#ffffff"
              strokeLinejoin="miter"
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
