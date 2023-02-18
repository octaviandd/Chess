/** @format */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Square from "./Square";

function createInitialBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      if (i === 1) {
        board[i][j] = {row: i, column: j, piece: "black_pawn"};
      } else if (i === 0) {
        if (j === 0 || j === 7) {
          board[i][j] = {row: i, column: j, piece: "black_rook"};
        } else if (j === 1 || j === 6) {
          board[i][j] = {row: i, column: j, piece: "black_knight"};
        } else if (j === 2 || j === 5) {
          board[i][j] = {row: i, column: j, piece: "black_bishop"};
        } else if (j === 3) {
          board[i][j] = {row: i, column: j, piece: "black_queen"};
        } else if (j === 4) {
          board[i][j] = {row: i, column: j, piece: "black_king"};
        }
      } else if(i === 6){
        board[i][j] = {row: i, column: j, piece: "white_pawn"};
      } else if (i === 7) {
        if (j === 0 || j === 7) {
          board[i][j] = {row: i, column: j, piece: "white_rook"};
        } else if (j === 1 || j === 6) {
          board[i][j] = {row: i, column: j, piece: "white_knight"};
        } else if (j === 2 || j === 5) {
          board[i][j] = {row: i, column: j, piece: "white_bishop"};
        } else if (j === 3) {
          board[i][j] = {row: i, column: j, piece: "white_queen"};
        } else if (j === 4) {
          board[i][j] = {row: i, column: j, piece: "white_king"};
        }
      }else {
        board[i][j] = {row: i, column: j, piece: null};
      }
    }
  }
  return board;
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
