/** @format */

import React, { useState, useRef } from "react";
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

const setDefaultPieces = (piece: any, row: any, col: any) => {
  if (piece === "black_rook") {
    return <BlackRook row={row} col={col}></BlackRook>;
  } else if (piece === "black_knight") {
    return <BlackKnight row={row} col={col}></BlackKnight>;
  } else if (piece === "black_bishop") {
    return <BlackBishop row={row} col={col}></BlackBishop>;
  } else if (piece === "black_king") {
    return <BlackKing row={row} col={col}></BlackKing>;
  } else if (piece === "black_queen") {
    return <BlackQueen row={row} col={col}></BlackQueen>;
  } else if (piece === "black_bishop") {
    return <BlackBishop row={row} col={col}></BlackBishop>;
  } else if (piece === "black_knight") {
    return <BlackKnight row={row} col={col}></BlackKnight>;
  } else if (piece === "black_rook") {
    return <BlackRook row={row} col={col}></BlackRook>;
  } else if (piece === "black_pawn") {
    return <BlackPawn row={row} col={col}></BlackPawn>;
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

const canPawnMove = (board: any, i: any, j: any, pieceColor: string) => {
  let moves = [];
  if (pieceColor === "black") {
    if (board[i + 1] && board[i - 1]) {
      if (i === 1) {
        if (board[i + 1][j + 1] && board[i + 1][j + 1].piece !== null) {
          moves.push(board[i + 1][j + 1]);
        }
        if (board[i + 1][j - 1] && board[i + 1][j - 1].piece !== null) {
          moves.push(board[i + 1][j - 1]);
        }

        if (board[i + 2][j] && board[i + 2][j].piece !== null) {
          moves.push(board[i + 1][j]);
        } else if (
          board[i + 1][j] &&
          board[i + 1][j].piece === null &&
          board[i + 2][j] &&
          board[i + 2][j].piece === null
        ) {
          moves.push(board[i + 1][j], board[i + 2][j]);
        }
      } else {
        if (board[i + 1][j + 1] && board[i + 1][j + 1].piece !== null) {
          moves.push(board[i + 1][j + 1]);
        }
        if (board[i + 1][j - 1] && board[i + 1][j - 1].piece !== null) {
          moves.push(board[i + 1][j - 1]);
        }

        if (board[i + 1][j] && board[i + 1][j].piece === null) {
          moves.push(board[i + 1][j]);
        }
      }
    }

    return moves;
  } else {
    if (i === 6) {
      if (board[i - 1][j + 1] && board[i - 1][j + 1].piece !== null) {
        moves.push(board[i - 1][j + 1]);
      }
      if (board[i - 1][j - 1] && board[i - 1][j - 1].piece !== null) {
        moves.push(board[i - 1][j - 1]);
      }

      if (board[i - 2][j] && board[i - 2][j].piece !== null) {
        moves.push(board[i - 1][j]);
      } else if (
        board[i - 1][j] &&
        board[i - 1][j].piece === null &&
        board[i - 2][j] &&
        board[i - 2][j].piece === null
      ) {
        moves.push(board[i - 1][j], board[i - 2][j]);
      }
    } else {
      if (board[i - 1][j + 1] && board[i - 1][j + 1].piece !== null) {
        moves.push(board[i - 1][j + 1]);
      }
      if (board[i - 1][j - 1] && board[i - 1][j - 1].piece !== null) {
        moves.push(board[i - 1][j - 1]);
      }

      if (board[i - 1][j] && board[i - 1][j].piece === null) {
        moves.push(board[i - 1][j]);
      }
    }
    return moves;
  }
};

const canKnightMove = (board: any, i: any, j: any) => {
  let moves = [];

  let knightMoves = [
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
  ];

  for (let m of knightMoves) {
    if (board[i + m.x] && board[i + m.x][j + m.y]) {
      moves.push(board[i + m.x][j + m.y]);
    }
  }
  return moves;
};

const canBishopMove = (board: any, i: any, j: any, pieceColor: string) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let moves = [];

  let x = 0;

  while (x < i && x < spaceToRight) {
    x++;
    moves.push(board[i - x][j + x]);
    if (board[i - x][j + x].piece !== null) {
      if (board[i - x][j + x].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i - x][j + x].piece.includes(pieceColor)) {
        moves.push(board[i - x][j + x]);
        break;
      }
    }
  }

  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    moves.push(board[i + o][j + o]);
    if (board[i + o][j + o].piece !== null) {
      if (board[i + o][j + o].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i + o][j + o].piece.includes(pieceColor)) {
        moves.push(board[i + o][j + o]);
        break;
      }
    }
  }

  let m = 0;
  while (m < spaceToBottom && m < j) {
    m++;
    moves.push(board[i + m][j - m]);
    if (board[i + m][j - m].piece !== null) {
      if (board[i + m][j - m].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i + m][j - m].piece.includes(pieceColor)) {
        moves.push(board[i + m][j - m]);
        break;
      }
    }
  }

  let n = 0;
  while (n < i && n < j) {
    n++;
    moves.push(board[i - n][j - n]);
    if (board[i - n][j - n].piece !== null) {
      if (board[i - n][j - n].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i - n][j - n].piece.includes(pieceColor)) {
        moves.push(board[i - n][j - n]);
        break;
      }
    }
  }

  return moves;
};

const canRookMove = (board: any, i: any, j: any, pieceColor: string) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let moves = [];

  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[i][j + y]);
    if (board[i][j + y].piece !== null) {
      if (board[i][j + y].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= j; y++) {
    moves.push(board[i][j - y]);
    if (board[i][j - y].piece !== null) {
      if (board[i][j - y].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= i; y++) {
    moves.push(board[i - y][j]);
    if (board[i - y][j].piece !== null) {
      if (board[i - y][j].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + i][j]);
    if (board[i + y][j].piece !== null) {
      if (board[i + y][j].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  return moves;
};

const canKingMove = (board: any, i: any, j: any, pieceColor: string) => {
  let moves = [];
  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, 7); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, 7); y++) {
      if (x !== i || y !== j) {
        moves.push(board[x][y]);
      }
    }
  }

  return moves;
};

const canQueenMove = (board: any, i: any, j: any, pieceColor: string) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let moves = [];

  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[i][j + y]);
    if (board[i][j + y].piece !== null) {
      if (board[i][j + y].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= j; y++) {
    moves.push(board[i][j - y]);
    if (board[i][j - y].piece !== null) {
      if (board[i][j - y].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= i; y++) {
    moves.push(board[i - y][j]);
    if (board[i - y][j].piece !== null) {
      if (board[i - y][j].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + i][j]);
    if (board[y + i][j].piece !== null) {
      if (board[y + i][j].piece.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  let x = 0;

  while (x < i && x < spaceToRight) {
    x++;
    moves.push(board[i - x][j + x]);
    if (board[i - x][j + x].piece !== null) {
      if (board[i - x][j + x].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i - x][j + x].piece.includes(pieceColor)) {
        moves.push(board[i - x][j + x]);
        break;
      }
    }
  }

  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    moves.push(board[i + o][j + o]);
    if (board[i + o][j + o].piece !== null) {
      if (board[i + o][j + o].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i + o][j + o].piece.includes(pieceColor)) {
        moves.push(board[i + o][j + o]);
        break;
      }
    }
  }

  let m = 0;
  while (m < spaceToBottom && m < j) {
    m++;
    moves.push(board[i + m][j - m]);
    if (board[i + m][j - m].piece !== null) {
      if (board[i + m][j - m].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i + m][j - m].piece.includes(pieceColor)) {
        moves.push(board[i + m][j - m]);
        break;
      }
    }
  }

  let n = 0;
  while (n < i && n < j) {
    n++;
    moves.push(board[i - n][j - n]);
    if (board[i - n][j - n].piece !== null) {
      if (board[i - n][j - n].piece.includes(pieceColor)) {
        break;
      }
      if (!board[i - n][j - n].piece.includes(pieceColor)) {
        moves.push(board[i - n][j - n]);
        break;
      }
    }
  }
  return moves;
};

interface ISubmitPositions {
  moves: any;
}

export default function Square({
  board,
  color,
  row,
  col,
  setBoard,
  piece,
  turn,
  handleTurn,
}: Props) {
  const [state, setState] = useState();

  const [{ isOver, canDrop, didDrop }, drop]: any = useDrop(
    () => ({
      accept: [
        ItemTypes.PAWN,
        ItemTypes.ROOK,
        ItemTypes.BISHOP,
        ItemTypes.KING,
        ItemTypes.QUEEN,
        ItemTypes.KNIGHT,
      ],
      canDrop: (item: any) => {
        let pieceColor = item.piece.split("_")[0];
        let piece = item.piece.split("_")[1];
        if (turn !== pieceColor) {
          return false;
        } else {
          if (piece === "pawn") {
            return canPawnMove(board, item.row, item.col, pieceColor).find(
              (el: any) => el.row === row && el.column === col
            );
          } else if (piece === "knight") {
            return canKnightMove(board, item.row, item.col).find(
              (el: any) => el.row === row && el.column === col
            );
          } else if (piece === "bishop") {
            return canBishopMove(board, item.row, item.col, piece).find(
              (el: any) => el.row === row && el.column === col
            );
          } else if (piece === "rook") {
            return canRookMove(board, item.row, item.col, pieceColor).find(
              (el: any) => el.row === row && el.column === col
            );
          } else if (piece === "king") {
            return canKingMove(board, item.row, item.col, pieceColor).find(
              (el: any) => el.row === row && el.column === col
            );
          } else if (piece === "queen") {
            return canQueenMove(board, item.row, item.col, pieceColor).find(
              (el: any) => el.row === row && el.column === col
            );
          } else {
            return false;
          }
        }
      },
      drop: (item: any, monitor) => {
        setBoard((prevState: any) => {
          let copy = [...prevState];
          copy[row][col].piece = item.piece;
          board[item.row][item.col].piece = null;
          return copy;
        });
        if (turn === "white") {
          handleTurn("black");
        } else if (turn === "black") {
          handleTurn("white");
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        didDrop: !!monitor.didDrop(),
        dropResults: monitor.getDropResult(),
        item: monitor.getItem(),
      }),
    }),
    [turn]
  );

  return (
    <SquareDiv color={color} piece={piece.piece !== null} ref={drop}>
      {setDefaultPieces(piece.piece, row, col)}
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
