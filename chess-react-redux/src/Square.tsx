/** @format */

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import BlackBishop from "./app/Pieces/BlackBishop";
import BlackKing from "./app/Pieces/BlackKing";
import BlackKnight from "./app/Pieces/BlackKnight";
import BlackPawn from "./app/Pieces/BlackPawn";
import BlackQueen from "./app/Pieces/BlackQueen";
import BlackRook from "./app/Pieces/BlackRook";
import WhiteBishop from "./app/Pieces/WhiteBishop";
import WhiteKing from "./app/Pieces/WhiteKing";
import WhiteKnight from "./app/Pieces/WhiteKnight";
import WhitePawn from "./app/Pieces/WhitePawn";
import WhiteQueen from "./app/Pieces/WhiteQueen";
import WhiteRook from "./app/Pieces/WhiteRook";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Overlay, OverlayType } from "./Overlay";
import {
  canBishopMove,
  canKingMove,
  canPawnMove,
  canRookMove,
  canKnightMove,
  canQueenMove,
  checkBlackKing,
} from "./game";

const setDefaultPieces = (
  piece: any,
  row: any,
  col: any,
  setBlackKingCheck: any,
  board: any,
  positionsOfCheck: any
) => {
  if (piece === "black_rook") {
    return <BlackRook row={row} col={col}></BlackRook>;
  } else if (piece === "black_knight") {
    return <BlackKnight row={row} col={col}></BlackKnight>;
  } else if (piece === "black_bishop") {
    return <BlackBishop row={row} col={col}></BlackBishop>;
  } else if (piece === "black_king") {
    return (
      <BlackKing
        row={row}
        col={col}
        setBlackKingCheck={setBlackKingCheck}
        board={board}
      ></BlackKing>
    );
  } else if (piece === "black_queen") {
    return <BlackQueen row={row} col={col}></BlackQueen>;
  } else if (piece === "black_bishop") {
    return <BlackBishop row={row} col={col}></BlackBishop>;
  } else if (piece === "black_knight") {
    return <BlackKnight row={row} col={col}></BlackKnight>;
  } else if (piece === "black_rook") {
    return <BlackRook row={row} col={col}></BlackRook>;
  } else if (piece === "black_pawn") {
    return (
      <BlackPawn
        row={row}
        col={col}
        positionsOfCheck={positionsOfCheck}
        board={board}
      ></BlackPawn>
    );
  } else if (piece === "white_rook") {
    return <WhiteRook row={row} col={col}></WhiteRook>;
  } else if (piece === "white_knight") {
    return <WhiteKnight row={row} col={col}></WhiteKnight>;
  } else if (piece === "white_bishop") {
    return <WhiteBishop row={row} col={col}></WhiteBishop>;
  } else if (piece === "white_king") {
    return <WhiteKing row={row} col={col}></WhiteKing>;
  } else if (piece === "white_queen") {
    return <WhiteQueen row={row} col={col}></WhiteQueen>;
  } else if (piece === "white_bishop") {
    return <WhiteBishop row={row} col={col}></WhiteBishop>;
  } else if (piece === "white_knight") {
    return <WhiteKnight row={row} col={col}></WhiteKnight>;
  } else if (piece === "white_rook") {
    return <WhiteRook row={row} col={col}></WhiteRook>;
  } else if (piece === "white_pawn") {
    return <WhitePawn row={row} col={col}></WhitePawn>;
  } else {
    return null;
  }
};

type Props = {
  positionsOfCheck: any;
  setPositionsOfCheck: any;
  isBlackKingChecked: boolean;
  setBlackKingChecked: any;
  color: string;
  row: number;
  col: number;
  board: any;
  setBoard: any;
  setPossibleMoves: any;
  turn: string;
  piece: any;
  handleTurn: any;
};

type SquareProps = {
  piece: boolean;
  color: string;
};

const searchForBlackKing = (board: any) => {
  let blackKingPositionsX = 0;
  let blackKingPositionsY = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece === "black_king") {
        blackKingPositionsX = board[i][j].row;
        blackKingPositionsY = board[i][j].column;
      }
    }
  }
  return { blackKingPositionsX, blackKingPositionsY };
};

const checkPossibleMoves = (
  item: any,
  piece: any,
  board: any,
  row: any,
  col: any,
  turn: any
) => {
  let pieceColor = item.piece.split("_")[0];
  let incomingPiece = item.piece.split("_")[1];
  if (piece.piece !== null) {
    if (piece.piece && piece.piece.includes(pieceColor)) {
      return false;
    }
  }
  if (turn !== pieceColor) {
    return false;
  } else {
    if (incomingPiece === "pawn") {
      return canPawnMove(board, item.row, item.col, pieceColor).find(
        (el: any) => el.row === row && el.column === col
      );
    } else if (incomingPiece === "knight") {
      return canKnightMove(board, item.row, item.col).find(
        (el: any) => el.row === row && el.column === col
      );
    } else if (incomingPiece === "bishop") {
      return canBishopMove(board, item.row, item.col, piece).find(
        (el: any) => el.row === row && el.column === col
      );
    } else if (incomingPiece === "rook") {
      return canRookMove(board, item.row, item.col, pieceColor).find(
        (el: any) => el.row === row && el.column === col
      );
    } else if (incomingPiece === "king") {
      return canKingMove(board, item.row, item.col, pieceColor).find(
        (el: any) => el.row === row && el.column === col
      );
    } else if (incomingPiece === "queen") {
      return canQueenMove(board, item.row, item.col, pieceColor).find(
        (el: any) => el.row === row && el.column === col
      );
    } else {
      return false;
    }
  }
};

export default function Square({
  board,
  color,
  row,
  col,
  setBoard,
  piece,
  turn,
  handleTurn,
  isBlackKingChecked,
  setPositionsOfCheck,
  positionsOfCheck,
  setBlackKingChecked,
}: Props) {
  const [{ isOver, canDrop, didDrop }, drop]: any = useDrop(
    () => ({
      accept: Object.keys(ItemTypes).map((k) => ItemTypes[k]),
      canDrop: (item: any) => {
        return checkPossibleMoves(item, piece, board, row, col, turn);
      },
      drop: (item: any, monitor) => {
        console.log(item);
        setBoard((prevState: any) => {
          let copy = [...prevState];
          copy[row][col].piece = item.piece;
          board[item.row][item.col].piece = null;
          return copy;
        });

        let blackKingPosition = searchForBlackKing(board);

        setBlackKingChecked(
          checkBlackKing(
            board,
            blackKingPosition.blackKingPositionsX,
            blackKingPosition.blackKingPositionsY,
            "black"
          ).check.isCheckedFromKnight
        );
        setPositionsOfCheck(
          checkBlackKing(
            board,
            blackKingPosition.blackKingPositionsX,
            blackKingPosition.blackKingPositionsY,
            "black"
          ).positionsOfCheck
        );

        handleTurn();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [turn, isBlackKingChecked]
  );

  return (
    <SquareDiv color={color} piece={piece.piece !== null} ref={drop}>
      {setDefaultPieces(
        piece.piece,
        row,
        col,
        setBlackKingChecked,
        board,
        positionsOfCheck
      )}
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </SquareDiv>
  );
}

const SquareDiv = styled.div<SquareProps>`
  position: relative;

  width: 80px;
  height: 80px;
  background-color: ${(props) =>
    props.color === "dark" ? "#b58863" : "#f0d9b5"};

  /* :hover {
    ${({ piece }) => piece && `background-color: #90ee90`}
  } */
`;
