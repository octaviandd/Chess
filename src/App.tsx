/** @format */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Square from "./Square";

function createInitialBoard() {
  const initialSetup = [
    ["black_rook", "black_knight", "black_bishop", "black_queen", "black_king", "black_bishop", "black_knight", "black_rook"],
    Array(8).fill("black_pawn"),
    ...Array(4).fill(Array(8).fill(null)),
    Array(8).fill("white_pawn"),
    ["white_rook", "white_knight", "white_bishop", "white_queen", "white_king", "white_bishop", "white_knight", "white_rook"]
  ];

  return initialSetup.map((row, i) =>
    row.map((piece, j) => ({ row: i, column: j, piece }))
  );
}


function App() {
  const [board, setBoard] = useState(createInitialBoard());
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
    if (turn === "white") setTurn("black");
    else if (turn === "black") setTurn("white");
  };

  useEffect(() => {
    if (kingChecks.whiteCheckMated || kingChecks.blackCheckMated) alert("check mate");
  }, [kingChecks.whiteCheckMated, kingChecks.blackCheckMated]);

  return (
    <Grid>
      {board.map((row: any, i: any) =>
        row.map((col: any, j: any) => {
          const isDark = (i % 2 !== 0) === (j % 2 !== 0);
          const color = isDark ? 'dark' : 'light';
          return (
            <Square
              board={board}
              setBoard={setBoard}
              color={color}
              col={j}
              row={i}
              key={`${j + i}`}
              turn={turn}
              handleTurn={handleTurn}
              kingChecks={kingChecks}
              setKingChecks={setKingChecks}
            ></Square>
          );
        })
      )}
    </Grid>
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
