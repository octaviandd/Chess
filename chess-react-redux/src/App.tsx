/** @format */
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Square from "./Square";

const initialBoard = [
  [
    {
      row: 0,
      column: 0,
      piece: "black_rook",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 1,
      piece: "black_knight",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 2,
      piece: "black_bishop",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 3,
      piece: "black_king",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 4,
      piece: "black_queen",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 5,
      piece: "black_bishop",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 6,
      piece: "black_knight",
      availableFutureMoves: null,
    },
    {
      row: 0,
      column: 7,
      piece: "black_rook",
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 1,
      column: 0,
      piece: "black_pawn",
      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 1,
      piece: "black_pawn",
      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 2,
      piece: "black_pawn",
      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 3,
      piece: "black_pawn",

      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 4,
      piece: "black_pawn",
      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 5,
      piece: "black_pawn",
      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 6,
      piece: "black_pawn",

      availableFutureMoves: null,
    },
    {
      row: 1,
      column: 7,
      piece: "black_pawn",

      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 2,
      column: 0,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 1,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 2,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 3,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 4,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 5,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 6,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 2,
      column: 7,
      piece: null,
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 3,
      column: 0,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 1,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 2,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 3,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 4,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 5,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 6,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 3,
      column: 7,
      piece: null,
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 4,
      column: 0,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 1,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 2,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 3,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 4,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 5,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 6,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 4,
      column: 7,
      piece: null,
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 5,
      column: 0,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 1,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 2,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 3,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 4,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 5,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 6,
      piece: null,
      availableFutureMoves: null,
    },
    {
      row: 5,
      column: 7,
      piece: null,
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 6,
      column: 0,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 1,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 2,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 3,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 4,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 5,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 6,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
    {
      row: 6,
      column: 7,
      piece: "white_pawn",
      availableFutureMoves: null,
    },
  ],
  [
    {
      row: 7,
      column: 0,
      piece: "white_rook",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 1,
      piece: "white_knight",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 2,
      piece: "white_bishop",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 3,
      piece: "white_king",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 4,
      piece: "white_queen",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 5,
      piece: "white_bishop",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 6,
      piece: "white_knight",
      availableFutureMoves: null,
    },
    {
      row: 7,
      column: 7,
      piece: "white_rook",
      availableFutureMoves: null,
    },
  ],
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("white");

  const [kingChecks, setKingChecks] = useState({
    whiteKingIsChecked: false,
    whiteKingPositionsOfCheck: null,
    whiteKingPositionsOnTheDirectionOfCheck: null,
    whiteKingDefendingPieces: null,
    blackKingIsChecked: false,
    blackKingPositionsOfCheck: null,
    blackKingPositionsOnTheDirectionOfCheck: null,
    blackKingDefendingPieces: null,
  });

  const handleTurn = () => {
    if (turn === "white") {
      setTurn("black");
    } else if (turn === "black") {
      setTurn("white");
    }
  };

  return (
    <div className="App">
      <Grid>
        {board.map((row: any, i: any) =>
          row.map((col: any, j: any) => {
            if (i % 2 !== 0) {
              if (j % 2 !== 0) {
                return (
                  <Square
                    board={Object.assign(board)}
                    setBoard={setBoard}
                    color="dark"
                    col={j}
                    row={i}
                    key={`${j + i}`}
                    piece={board[i][j]}
                    turn={turn}
                    handleTurn={handleTurn}
                    kingChecks={kingChecks}
                    setKingChecks={setKingChecks}
                  ></Square>
                );
              } else {
                return (
                  <Square
                    board={board}
                    setBoard={setBoard}
                    color="light"
                    col={j}
                    row={i}
                    key={`${j + i}`}
                    piece={board[i][j]}
                    turn={turn}
                    handleTurn={handleTurn}
                    kingChecks={kingChecks}
                    setKingChecks={setKingChecks}
                  ></Square>
                );
              }
            } else if (i % 2 == 0) {
              if (j % 2 !== 0) {
                return (
                  <Square
                    board={board}
                    setBoard={setBoard}
                    color="light"
                    col={j}
                    row={i}
                    key={`${j + i}`}
                    piece={board[i][j]}
                    turn={turn}
                    handleTurn={handleTurn}
                    kingChecks={kingChecks}
                    setKingChecks={setKingChecks}
                  ></Square>
                );
              } else {
                return (
                  <Square
                    board={board}
                    setBoard={setBoard}
                    color="dark"
                    col={j}
                    row={i}
                    key={`${j + i}`}
                    piece={board[i][j]}
                    turn={turn}
                    handleTurn={handleTurn}
                    kingChecks={kingChecks}
                    setKingChecks={setKingChecks}
                  ></Square>
                );
              }
            }
          })
        )}
      </Grid>
    </div>
  );
}

export default App;

const Grid = styled.div`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 0px;
  border: 1px solid black;
`;
