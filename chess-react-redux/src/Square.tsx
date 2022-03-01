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
  checkBlackKing,
  checkWhiteKing,
  checkPossibleMovesForEveryPiece,
  searchForKings,
} from "./game";

const setDefaultPieces = (
  piece: any,
  row: any,
  col: any,
  board: any,
  kingChecks: any,
  setKingChecks: any
) => {
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
    return (
      <BlackPawn
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
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
  kingChecks: any;
  setKingChecks: any;
};

type SquareProps = {
  piece: boolean;
  color: string;
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
  setKingChecks,
  kingChecks,
}: Props) {
  const [{ isOver, canDrop }, drop]: any = useDrop(
    () => ({
      accept: Object.keys(ItemTypes).map((k) => ItemTypes[k]),
      canDrop: (item: any) => {
        if (kingChecks.blackKingIsChecked || kingChecks.whiteKingIsChecked) {
          if (item.availableMovesInCheck) {
            return item.availableMovesInCheck.find(
              (el: any) => el.row === row && el.column === col
            );
          }
        } else {
          return checkPossibleMovesForEveryPiece(
            item,
            piece,
            board,
            row,
            col,
            turn
          );
        }
      },
      drop: (item: any, monitor) => {
        setBoard((prevState: any) => {
          let copy = [...prevState];
          copy[row][col].piece = item.piece;
          board[item.row][item.col].piece = null;
          return copy;
        });

        let kingColor = turn === "white" ? "black" : "white";

        let kingsPositions = searchForKings(board, kingColor);
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
        } = checkBlackKing(
          board,
          blackKingPositionsX,
          blackKingPositionsY,
          "black"
        );

        const {
          numberOfChecks_white,
          positionsOfCheck_white,
          positionsOnTheDirectionOfCheck_white,
        } = checkWhiteKing(
          board,
          whiteKingPositionsX,
          whiteKingPositionsY,
          "white"
        );

        setKingChecks((prevState: any) => ({
          ...prevState,
          whiteKingIsChecked: numberOfChecks_white !== 0,
          whiteKingPositionsOfCheck: positionsOfCheck_white,
          whiteKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheck_white,
          blackKingIsChecked: numberOfChecks !== 0,
          blackKingPositionsOfCheck: positionsOfCheck,
          blackKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheck,
        }));

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
    [turn, kingChecks.isBlackKingChecked]
  );

  return (
    <SquareDiv color={color} piece={piece.piece !== null} ref={drop}>
      {setDefaultPieces(
        piece.piece,
        row,
        col,
        board,
        kingChecks,
        setKingChecks
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
`;
