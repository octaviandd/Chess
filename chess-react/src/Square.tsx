/** @format */

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import BlackBishop from "./Pieces/BlackBishop";
import BlackKing from "./Pieces/BlackKing";
import BlackKnight from "./Pieces/BlackKnight";
import BlackPawn from "./Pieces/BlackPawn";
import BlackQueen from "./Pieces/BlackQueen";
import BlackRook from "./Pieces/BlackRook";
import WhiteBishop from "./Pieces/WhiteBishop";
import WhiteKing from "./Pieces/WhiteKing";
import WhiteKnight from "./Pieces/WhiteKnight";
import WhitePawn from "./Pieces/WhitePawn";
import WhiteQueen from "./Pieces/WhiteQueen";
import WhiteRook from "./Pieces/WhiteRook";
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
  kingChecks: IKingChecks
) => {
  let piece = board[row][col].piece;
  if (piece === "black_rook") {
    return (
      <BlackRook
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackRook>
    );
  } else if (piece === "black_knight") {
    return (
      <BlackKnight
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackKnight>
    );
  } else if (piece === "black_bishop") {
    return (
      <BlackBishop
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackBishop>
    );
  } else if (piece === "black_king") {
    return (
      <BlackKing
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackKing>
    );
  } else if (piece === "black_queen") {
    return (
      <BlackQueen
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackQueen>
    );
  } else if (piece === "black_bishop") {
    return (
      <BlackBishop
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackBishop>
    );
  } else if (piece === "black_knight") {
    return (
      <BlackKnight
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackKnight>
    );
  } else if (piece === "black_rook") {
    return (
      <BlackRook
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></BlackRook>
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
  } else if (piece === "white_rook") {
    return (
      <WhiteRook
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteRook>
    );
  } else if (piece === "white_knight") {
    return (
      <WhiteKnight
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteKnight>
    );
  } else if (piece === "white_bishop") {
    return (
      <WhiteBishop
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteBishop>
    );
  } else if (piece === "white_king") {
    return (
      <WhiteKing
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteKing>
    );
  } else if (piece === "white_queen") {
    return (
      <WhiteQueen
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteQueen>
    );
  } else if (piece === "white_bishop") {
    return (
      <WhiteBishop
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteBishop>
    );
  } else if (piece === "white_knight") {
    return (
      <WhiteKnight
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteKnight>
    );
  } else if (piece === "white_rook") {
    return (
      <WhiteRook
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
      ></WhiteRook>
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
        if (item.piece === "white_king") {
          if (turn === "white") {
            return item.availableMovesInCheck.find(
              (el: ISquare) => el.row === row && el.column === col
            );
          }
        }
        if (item.piece === "black_king") {
          if (turn === "black") {
            return item.availableMovesInCheck.find(
              (el: ISquare) => el.row === row && el.column === col
            );
          }
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

        if (turn === "white") {
        }

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
      {setDefaultPieces(row, col, board, kingChecks)}
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
