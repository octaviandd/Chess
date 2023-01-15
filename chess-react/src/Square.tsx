/** @format */

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import BlackKing from "./Pieces/BlackKing";
import BlackPawn from "./Pieces/BlackPawn";
import WhiteKing from "./Pieces/WhiteKing";
import WhitePawn from "./Pieces/WhitePawn";
import BlackPiece from "./Pieces/BlackPiece"
import WhitePiece from "./Pieces/WhitePiece"
import BlackRookSVG from "../src/Pieces/black_rook.svg";
import BlackKnightSVG from "../src/Pieces/black_knight.svg";
import BlackBishopSVG from "../src/Pieces/black_bishop.svg";
import BlackQueenSVG from "../src/Pieces/black_bishop.svg";
import BlackKingSVG from "../src/Pieces/black_bishop.svg";
import BlackPawnSVG from "../src/Pieces/black_bishop.svg";
import WhiteRookSVG from "./Pieces/white_rook.svg";
import WhiteBishopSVG from "./Pieces/white_bishop.svg";
import WhiteKnightSVG from "./Pieces/white_knight.svg";
import WhiteQueenSVG from "./Pieces/white_queen.svg";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Overlay, OverlayType } from "./Overlay";
import {
  checkPossibleMovesForEveryPiece,
  searchForKings,
  checkForKingChecks,
} from "./game";
import {
  CSSSquareProps,
  ISquareFunction,
  IPieceToSquare,
  ISquare,
  IKingChecks,
  TBoard,
} from "./types";

const setDefaultPieces = (
  row: number,
  col: number,
  board: TBoard,
  kingChecks: IKingChecks,
  setKingChecks: any
) => {
  let piece = board[row][col].piece;
  if (piece === "black_rook" || piece === "black_queen" || piece === "black_knight" || piece === "black_bishop") {
    return (
      <BlackPiece
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        pieceColor="black"
        pieceType={piece}
        pieceSVG={piece === "black_rook" ? BlackRookSVG : piece === "black_knight" ? BlackKnightSVG : piece === "black_bishop" ? BlackBishopSVG : BlackQueenSVG}
      >
      </BlackPiece>
    )
  } else if (piece === "black_king") {
    return (
      <BlackKing
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        setKingChecks={setKingChecks}
      ></BlackKing>
    );
  } else if (piece === "black_pawn") {
    return (
      <BlackPawn
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackPawn>
    );
  } else if (piece === "white_rook" || piece === "white_queen" || piece === "white_knight" || piece === "white_bishop") {
    return (
      <WhitePiece
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        pieceColor="white"
        pieceType={piece}
        pieceSVG={piece === "white_rook" ? WhiteRookSVG : piece === "white_knight" ? WhiteKnightSVG : piece === "white_bishop" ? WhiteBishopSVG : WhiteQueenSVG}
      ></WhitePiece>
    );
  } else if (piece === "white_king") {
    return (
      <WhiteKing
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        setKingChecks={setKingChecks}
      ></WhiteKing>
    );
  } else if (piece === "white_pawn") {
    return (
      <WhitePawn
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhitePawn>
    );
  } else {
    return null;
  }
};

export default function Square({
  board,
  color,
  row,
  col,
  setBoard,
  turn,
  handleTurn,
  setKingChecks,
  kingChecks,
}: ISquareFunction) {
  const [{ isOver, canDrop }, drop]: any = useDrop(
    () => ({
      accept: Object.keys(ItemTypes).map((k) => ItemTypes[k]),
      canDrop: (item: any) => {
        if (item.piece === "white_king" && turn === "white") {
          return item.availableMovesInCheck.find(
            (el: ISquare) => el.row === row && el.column === col
          );
        }
        if (item.piece === "black_king" && turn === "black") {
          return item.availableMovesInCheck.find(
            (el: ISquare) => el.row === row && el.column === col
          );
        }
        if (kingChecks.blackKingIsChecked || kingChecks.whiteKingIsChecked) {
          if (item.availableMovesInCheck) {
            return item.availableMovesInCheck.find(
              (el: ISquare) => el.row === row && el.column === col
            );
          }
        } else {
          if (
            item.availableMovesInPinned &&
            item.availableMovesInPinned.length > 0
          ) {
            return item.availableMovesInPinned.find(
              (el: ISquare) => el.row === row && el.column === col
            );
          } else {
            return checkPossibleMovesForEveryPiece(item, board, row, col, turn);
          }
        }
      },
      drop: (item: IPieceToSquare) => {
        let copyOfBoard = board;
        copyOfBoard[row][col].piece = item.piece;
        copyOfBoard[item.row][item.col].piece = null;

        setBoard((prevState: TBoard) => {
          let copy = [...prevState];
          copy[row][col].piece = item.piece;
          board[item.row][item.col].piece = null;
          return copy;
        });

        let kingsPositions = searchForKings(copyOfBoard);
        const {
          blackKingPositionsX,
          blackKingPositionsY,
          whiteKingPositionsX,
          whiteKingPositionsY,
        } = kingsPositions;

        const {
          numberOfChecks,
          positionsOfCheck,
          positionsOnTheDirectionOfCheck,
          kingDefendingPieces,
        } = checkForKingChecks({
          board: copyOfBoard,
          row: blackKingPositionsX,
          col: blackKingPositionsY,
          pieceColor: "black",
        });

        const {
          numberOfChecks: numberOfChecks_white,
          positionsOfCheck: positionsOfCheck_white,
          positionsOnTheDirectionOfCheck: positionsOnTheDirectionOfCheck_white,
          kingDefendingPieces: kingDefendingPieces_white,
        } = checkForKingChecks({
          board: copyOfBoard,
          row: whiteKingPositionsX,
          col: whiteKingPositionsY,
          pieceColor: "white",
        });

        setKingChecks((prevState: IKingChecks) => ({
          ...prevState,
          whiteKingIsChecked: numberOfChecks_white !== 0,
          whiteKingPositionsOfCheck: positionsOfCheck_white,
          whiteKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheck_white,
          whiteKingDefendingPieces: kingDefendingPieces_white,
          blackKingIsChecked: numberOfChecks !== 0,
          blackKingPositionsOfCheck: positionsOfCheck,
          blackKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheck,
          blackKingDefendingPieces: kingDefendingPieces,
        }));
        handleTurn();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [turn, kingChecks.blackKingIsChecked, kingChecks.whiteKingIsChecked, board]
  );

  return (
    <SquareDiv color={color} piece={board[row][col].piece !== null} ref={drop}>
      {setDefaultPieces(row, col, board, kingChecks, setKingChecks)}
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </SquareDiv>
  );
}

const SquareDiv = styled.div<CSSSquareProps>`
  position: relative;
  width: 80px;
  height: 80px;
  background-color: ${(props) =>
    props.color === "dark" ? "#b58863" : "#f0d9b5"};
`;
