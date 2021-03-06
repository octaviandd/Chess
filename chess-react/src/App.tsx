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
    },
    {
      row: 0,
      column: 1,
      piece: "black_knight",
    },
    {
      row: 0,
      column: 2,
      piece: "black_bishop",
    },
    {
      row: 0,
      column: 3,
      piece: "black_king",
    },
    {
      row: 0,
      column: 4,
      piece: "black_queen",
    },
    {
      row: 0,
      column: 5,
      piece: "black_bishop",
    },
    {
      row: 0,
      column: 6,
      piece: "black_knight",
    },
    {
      row: 0,
      column: 7,
      piece: "black_rook",
    },
  ],
  [
    {
      row: 1,
      column: 0,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 1,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 2,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 3,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 4,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 5,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 6,
      piece: "black_pawn",
    },
    {
      row: 1,
      column: 7,
      piece: "black_pawn",
    },
  ],
  [
    {
      row: 2,
      column: 0,
      piece: null,
    },
    {
      row: 2,
      column: 1,
      piece: null,
    },
    {
      row: 2,
      column: 2,
      piece: null,
    },
    {
      row: 2,
      column: 3,
      piece: null,
    },
    {
      row: 2,
      column: 4,
      piece: null,
    },
    {
      row: 2,
      column: 5,
      piece: null,
    },
    {
      row: 2,
      column: 6,
      piece: null,
    },
    {
      row: 2,
      column: 7,
      piece: null,
    },
  ],
  [
    {
      row: 3,
      column: 0,
      piece: null,
    },
    {
      row: 3,
      column: 1,
      piece: null,
    },
    {
      row: 3,
      column: 2,
      piece: null,
    },
    {
      row: 3,
      column: 3,
      piece: null,
    },
    {
      row: 3,
      column: 4,
      piece: null,
    },
    {
      row: 3,
      column: 5,
      piece: null,
    },
    {
      row: 3,
      column: 6,
      piece: null,
    },
    {
      row: 3,
      column: 7,
      piece: null,
    },
  ],
  [
    {
      row: 4,
      column: 0,
      piece: null,
    },
    {
      row: 4,
      column: 1,
      piece: null,
    },
    {
      row: 4,
      column: 2,
      piece: null,
    },
    {
      row: 4,
      column: 3,
      piece: null,
    },
    {
      row: 4,
      column: 4,
      piece: null,
    },
    {
      row: 4,
      column: 5,
      piece: null,
    },
    {
      row: 4,
      column: 6,
      piece: null,
    },
    {
      row: 4,
      column: 7,
      piece: null,
    },
  ],
  [
    {
      row: 5,
      column: 0,
      piece: null,
    },
    {
      row: 5,
      column: 1,
      piece: null,
    },
    {
      row: 5,
      column: 2,
      piece: null,
    },
    {
      row: 5,
      column: 3,
      piece: null,
    },
    {
      row: 5,
      column: 4,
      piece: null,
    },
    {
      row: 5,
      column: 5,
      piece: null,
    },
    {
      row: 5,
      column: 6,
      piece: null,
    },
    {
      row: 5,
      column: 7,
      piece: null,
    },
  ],
  [
    {
      row: 6,
      column: 0,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 1,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 2,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 3,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 4,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 5,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 6,
      piece: "white_pawn",
    },
    {
      row: 6,
      column: 7,
      piece: "white_pawn",
    },
  ],
  [
    {
      row: 7,
      column: 0,
      piece: "white_rook",
    },
    {
      row: 7,
      column: 1,
      piece: "white_knight",
    },
    {
      row: 7,
      column: 2,
      piece: "white_bishop",
    },
    {
      row: 7,
      column: 3,
      piece: "white_king",
    },
    {
      row: 7,
      column: 4,
      piece: "white_queen",
    },
    {
      row: 7,
      column: 5,
      piece: "white_bishop",
    },
    {
      row: 7,
      column: 6,
      piece: "white_knight",
    },
    {
      row: 7,
      column: 7,
      piece: "white_rook",
    },
  ],
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("white");

  const [kingChecks, setKingChecks] = useState({
    whiteKingIsChecked: false,
    whiteKingPositionsOfCheck: [],
    whiteKingPositionsOnTheDirectionOfCheck: [],
    whiteKingDefendingPieces: [],
    blackKingIsChecked: false,
    blackKingPositionsOfCheck: [],
    blackKingPositionsOnTheDirectionOfCheck: [],
    blackKingDefendingPieces: [],
    whiteCheckMated: false,
    blackCheckMated: false,
  });

  const handleTurn = (): void => {
    if (turn === "white") {
      setTurn("black");
    } else if (turn === "black") {
      setTurn("white");
    }
  };

  useEffect(() => {
    if (kingChecks.whiteCheckMated || kingChecks.blackCheckMated) {
      alert("check mate");
    }
  }, [kingChecks.whiteCheckMated, kingChecks.blackCheckMated]);

  return (
    <div className="App">
      <Grid>
        {board.map((row: any, i: any) =>
          row.map((col: any, j: any) => {
            if (i % 2 !== 0) {
              if (j % 2 !== 0) {
                return (
                  <Square
                    board={board}
                    setBoard={setBoard}
                    color="dark"
                    col={j}
                    row={i}
                    key={`${j + i}`}
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
