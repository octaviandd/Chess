/** @format */

import { IPieceSearch, ISquare, TBoard } from "./types";

/**
 * Get the positions of both kings on the current board.
 * @param board
 * @param kingColor
 * @returns Kings positions
 */

export const searchForKings = (board: TBoard) => {
  let kingsPositions = {
    blackKingPositionsX: 0,
    blackKingPositionsY: 3,
    whiteKingPositionsX: 7,
    whiteKingPositionsY: 3,
  };

  // Loop through the matrix to find the Black King
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece === "black_king") {
        kingsPositions.blackKingPositionsX = board[i][j].row;
        kingsPositions.blackKingPositionsY = board[i][j].column;
      }
    }
  }

  // Loop through the matrix to find the White King
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].piece === "white_king") {
        kingsPositions.whiteKingPositionsX = board[i][j].row;
        kingsPositions.whiteKingPositionsY = board[i][j].column;
      }
    }
  }
  return kingsPositions;
};

/**
 * Find the possible moves of the pawn irrespective of current checks or pinning.
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns Pawn Moves
 */

export const canPawnMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
  let moves = [];
  if (pieceColor === "black") {
    if (board[row + 1] && board[row - 1]) {
      if (row === 1) {
        if (
          board[row + 1][col + 1] &&
          board[row + 1][col + 1].piece !== null &&
          !board[row + 1][col + 1].piece?.includes(pieceColor)
        ) {
          moves.push(board[row + 1][col + 1]);
        }
        if (
          board[row + 1][col - 1] &&
          board[row + 1][col - 1].piece !== null &&
          !board[row + 1][col - 1].piece?.includes(pieceColor)
        ) {
          moves.push(board[row + 1][col - 1]);
        }

        if (board[row + 2][col] && board[row + 2][col].piece !== null) {
          moves.push(board[row + 1][col]);
        } else if (
          board[row + 1][col] &&
          board[row + 1][col].piece === null &&
          board[row + 2][col] &&
          board[row + 2][col].piece === null
        ) {
          moves.push(board[row + 1][col], board[row + 2][col]);
        }
      } else {
        if (
          board[row + 1][col + 1] &&
          board[row + 1][col + 1].piece !== null &&
          !board[row + 1][col + 1].piece?.includes(pieceColor)
        ) {
          moves.push(board[row + 1][col + 1]);
        }
        if (
          board[row + 1][col - 1] &&
          board[row + 1][col - 1].piece !== null &&
          !board[row + 1][col - 1].piece?.includes(pieceColor)
        ) {
          moves.push(board[row + 1][col - 1]);
        }

        if (board[row + 1][col] && board[row + 1][col].piece === null) {
          moves.push(board[row + 1][col]);
        }
      }
    }

    return moves;
  } else {
    if (row === 6) {
      if (
        board[row - 1][col + 1] &&
        board[row - 1][col + 1].piece !== null &&
        !board[row - 1][col + 1].piece?.includes(pieceColor)
      ) {
        moves.push(board[row - 1][col + 1]);
      }
      if (
        board[row - 1][col - 1] &&
        board[row - 1][col - 1].piece !== null &&
        !board[row - 1][col - 1].piece?.includes(pieceColor)
      ) {
        moves.push(board[row - 1][col - 1]);
      }

      if (board[row - 2][col] && board[row - 2][col].piece !== null) {
        moves.push(board[row - 1][col]);
      } else if (
        board[row - 1][col] &&
        board[row - 1][col].piece === null &&
        board[row - 2][col] &&
        board[row - 2][col].piece === null
      ) {
        moves.push(board[row - 1][col], board[row - 2][col]);
      }
    } else {
      if (
        board[row - 1][col + 1] &&
        board[row - 1][col + 1].piece !== null &&
        !board[row - 1][col + 1].piece?.includes(pieceColor)
      ) {
        moves.push(board[row - 1][col + 1]);
      }
      if (
        board[row - 1][col - 1] &&
        board[row - 1][col - 1].piece !== null &&
        !board[row - 1][col - 1].piece?.includes(pieceColor)
      ) {
        moves.push(board[row - 1][col - 1]);
      }

      if (board[row - 1][col] && board[row - 1][col].piece === null) {
        moves.push(board[row - 1][col]);
      }
    }
    return moves;
  }
};

/**
 * Find the possible moves of the king irrespective of current checks or pinning
 * @param board
 * @param i
 * @param j
 * @returns
 */

export const canKnightMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
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
    if (board[row + m.x] && board[row + m.x][col + m.y]) {
      moves.push(board[row + m.x][col + m.y]);
    }
  }
  return moves;
};

/**
 * Find the possible moves of the bishop irrespective of current checks or pinning
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */
export const canBishopMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch) => {
  let spaceToRight = 7 - col;
  let spaceToBottom = 7 - row;
  let moves = [];

  let x = 0;

  while (x < row && x < spaceToRight) {
    x++;
    moves.push(board[row - x][col + x]);
    if (board[row - x][col + x].piece !== null) {
      if (board[row - x][col + x].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row - x][col + x].piece?.includes(pieceColor)) {
        moves.push(board[row - x][col + x]);
        break;
      }
    }
  }

  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    moves.push(board[row + o][col + o]);
    if (board[row + o][col + o].piece !== null) {
      if (board[row + o][col + o].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row + o][col + o].piece?.includes(pieceColor)) {
        moves.push(board[row + o][col + o]);
        break;
      }
    }
  }

  let m = 0;
  while (m < spaceToBottom && m < col) {
    m++;
    moves.push(board[row + m][col - m]);
    if (board[row + m][col - m].piece !== null) {
      if (board[row + m][col - m].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row + m][col - m].piece?.includes(pieceColor)) {
        moves.push(board[row + m][col - m]);
        break;
      }
    }
  }

  let n = 0;
  while (n < row && n < col) {
    n++;
    moves.push(board[row - n][col - n]);
    if (board[row - n][col - n].piece !== null) {
      if (board[row - n][col - n].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row - n][col - n].piece?.includes(pieceColor)) {
        moves.push(board[row - n][col - n]);
        break;
      }
    }
  }

  return moves;
};

/**
 * Find the possible rooks moves irrespective of checks or pinnings
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */

export const canRookMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
  let spaceToRight = 7 - col;
  let spaceToBottom = 7 - row;
  let moves = [];

  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[row][col + y]);
    if (board[row][col + y].piece !== null) {
      if (board[row][col + y].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= col; y++) {
    moves.push(board[row][col - y]);
    if (board[row][col - y].piece !== null) {
      if (board[row][col - y].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= row; y++) {
    moves.push(board[row - y][col]);
    if (board[row - y][col].piece !== null) {
      if (board[row - y][col].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + row][col]);
    if (board[row + y][col].piece !== null) {
      if (board[row + y][col].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  return moves;
};

/**
 * Find the possible moves of the king irrespective of checks or pinnings.
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */
export const canKingMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
  let moves = [];
  for (let x = Math.max(0, row - 1); x <= Math.min(row + 1, 7); x++) {
    for (let y = Math.max(0, col - 1); y <= Math.min(col + 1, 7); y++) {
      if (x !== row || y !== col) {
        if (board[x][y].piece && board[x][y].piece?.includes(pieceColor)) {
          continue;
        } else {
          moves.push(board[x][y]);
        }
      }
    }
  }
  return moves;
};

/**
 * Find the possible moves of the queen irrespective of checks or pinnings.
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */

export const canQueenMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
  let spaceToRight = 7 - col;
  let spaceToBottom = 7 - row;
  let moves = [];

  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[row][col + y]);
    if (board[row][col + y] && board[row][col + y].piece !== null) {
      if (board[row][col + y].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= col; y++) {
    moves.push(board[row][col - y]);
    if (board[row][col - y] && board[row][col - y].piece !== null) {
      if (board[row][col - y].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  for (let y = 1; y <= row; y++) {
    moves.push(board[row - y][col]);
    if (board[row - y][col] && board[row - y][col].piece !== null) {
      if (board[row - y][col].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + row][col]);
    if (board[y + row][col] && board[y + row][col].piece !== null) {
      if (board[y + row][col].piece?.includes(pieceColor)) {
        break;
      } else {
        break;
      }
    }
  }

  let x = 0;

  while (x < row && x < spaceToRight) {
    x++;
    moves.push(board[row - x][col + x]);
    if (board[row - x][col + x].piece !== null) {
      if (board[row - x][col + x].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row - x][col + x].piece?.includes(pieceColor)) {
        moves.push(board[row - x][col + x]);
        break;
      }
    }
  }

  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    moves.push(board[row + o][col + o]);
    if (board[row + o][col + o].piece !== null) {
      if (board[row + o][col + o].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row + o][col + o].piece?.includes(pieceColor)) {
        moves.push(board[row + o][col + o]);
        break;
      }
    }
  }

  let m = 0;
  while (m < spaceToBottom && m < col) {
    m++;
    moves.push(board[row + m][col - m]);
    if (board[row + m][col - m].piece !== null) {
      if (board[row + m][col - m].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row + m][col - m].piece?.includes(pieceColor)) {
        moves.push(board[row + m][col - m]);
        break;
      }
    }
  }

  let n = 0;
  while (n < row && n < col) {
    n++;
    moves.push(board[row - n][col - n]);
    if (board[row - n][col - n].piece !== null) {
      if (board[row - n][col - n].piece?.includes(pieceColor)) {
        break;
      }
      if (!board[row - n][col - n].piece?.includes(pieceColor)) {
        moves.push(board[row - n][col - n]);
        break;
      }
    }
  }
  return moves;
};

/**
 *
 * @param board Checks for possible direction of check, number of checks and the pieces that defend the king.
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */

export const checkForKingChecks = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch) => {
  let spaceToRight = 7 - col;
  let spaceToBottom = 7 - row;
  let moves = [];
  let numberOfChecks = 0;
  let positionsOfCheck: any = [];
  let positionsOnTheDirectionOfCheck: any = [];
  let kingDefendingPieces: any = [];
  let oppositeColor = pieceColor === "white" ? "black" : "white";

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

  // check for knight checks
  for (let m of knightMoves) {
    if (board[row + m.x] && board[row + m.x][col + m.y]) {
      moves.push(board[row + m.x][col + m.y]);
      if (
        board[row + m.x][col + m.y].piece &&
        board[row + m.x][col + m.y].piece === `${oppositeColor}_knight`
      ) {
        positionsOfCheck.push(board[row + m.x][col + m.y]);
        numberOfChecks++;
      }
    }
  }

  //check for checks from horizontal right
  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[row][col + y]);
    if (board[row][col + y].piece !== null) {
      if (board[row][col + y].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row][col + y]);
        break;
      } else {
        if (
          board[row][col + y].piece?.includes("rook") ||
          board[row][col + y].piece?.includes("queen")
        ) {
          numberOfChecks++;
          positionsOfCheck.push(board[row][col + y]);
          for (let q = y; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row][col + q]);
          }
        }
        break;
      }
    }
  }

  //check for checks from horizontal left
  for (let y = 1; y <= col; y++) {
    moves.push(board[row][col - y]);
    if (board[row][col - y].piece !== null) {
      if (board[row][col - y].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row][col - y]);
        break;
      } else {
        if (
          board[row][col - y].piece?.includes("rook") ||
          board[row][col - y].piece?.includes("queen")
        ) {
          numberOfChecks++;
          positionsOfCheck.push(board[row][col - y]);
          for (let q = y; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row][col - q]);
          }
        }
        break;
      }
    }
  }

  //check for checks from vertical top
  for (let y = 1; y <= row; y++) {
    moves.push(board[row - y][col]);
    if (board[row - y][col].piece !== null) {
      if (board[row - y][col].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row - y][col]);
        break;
      } else {
        if (
          board[row - y][col].piece?.includes("rook") ||
          board[row - y][col].piece?.includes("queen")
        ) {
          numberOfChecks++;
          positionsOfCheck.push(board[row - y][col]);
          for (let q = y; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row - q][col]);
          }
        }
        break;
      }
    }
  }

  //check for checks from vertical down
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + row][col]);
    if (board[y + row][col].piece !== null) {
      if (board[y + row][col].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[y + row][col]);
        break;
      } else {
        if (
          board[y + row][col].piece?.includes("rook") ||
          board[y + row][col].piece?.includes("queen")
        ) {
          numberOfChecks++;
          positionsOfCheck.push(board[y + row][col]);
          for (let q = y; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row + q][col]);
          }
        }
        break;
      }
    }
  }

  //check for checks from diagonal to right
  let x = 0;

  while (x < row && x < spaceToRight) {
    x++;
    moves.push(board[row - x][col + x]);
    if (board[row - x][col + x].piece !== null) {
      if (board[row - x][col + x].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row - x][col + x]);
        break;
      }
      if (!board[row - x][col + x].piece?.includes(pieceColor)) {
        moves.push(board[row - x][col + x]);
        if (
          board[row - x][col + x].piece?.includes("bishop") ||
          board[row - x][col + x].piece?.includes("queen")
          // board[row - x][col + x].piece.includes("pawn")
        ) {
          positionsOfCheck.push(board[row - x][col + x]);
          numberOfChecks++;
          for (let q = x; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row - q][col + q]);
          }
        }
        break;
      }
    }
  }

  //checks from diagonal RIGHT -> LEFT/TOP
  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    moves.push(board[row + o][col + o]);

    if (board[row + o][col + o].piece !== null) {
      if (board[row + o][col + o].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row + o][col + o]);
        break;
      }
      if (!board[row + o][col + o].piece?.includes(pieceColor)) {
        moves.push(board[row + o][col + o]);
        if (
          board[row + o][col + o].piece?.includes("bishop") ||
          board[row + o][col + o].piece?.includes("queen")
          // board[row + o][col + o].piece?.includes("pawn")
        ) {
          positionsOfCheck.push(board[row + o][col + o]);
          numberOfChecks++;
          for (let q = o; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row + q][col + q]);
          }
        }
        break;
      }
    }
  }

  let m = 0;
  while (m < spaceToBottom && m < col) {
    m++;
    moves.push(board[row + m][col - m]);
    if (board[row + m][col - m].piece !== null) {
      if (board[row + m][col - m].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row + m][col - m]);
        break;
      }
      if (!board[row + m][col - m].piece?.includes(pieceColor)) {
        moves.push(board[row + m][col - m]);
        if (
          board[row + m][col - m].piece?.includes("bishop") ||
          board[row + m][col - m].piece?.includes("queen")
          // board[row + m][col - m].piece.includes("pawn")
        ) {
          positionsOfCheck.push(board[row + m][col - m]);
          numberOfChecks++;
          for (let q = m; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row + q][col - q]);
          }
        }
        break;
      }
    }
  }

  let n = 0;
  while (n < row && n < col) {
    n++;
    moves.push(board[row - n][col - n]);
    if (board[row - n][col - n].piece !== null) {
      if (board[row - n][col - n].piece?.includes(pieceColor)) {
        kingDefendingPieces.push(board[row - n][col - n]);
        break;
      }
      if (!board[row - n][col - n].piece?.includes(pieceColor)) {
        moves.push(board[row - n][col - n]);
        if (
          board[row - n][col - n].piece?.includes("bishop") ||
          board[row - n][col - n].piece?.includes("queen")
          // board[row - n][col - n].piece?.includes("pawn")
        ) {
          positionsOfCheck.push(board[row - n][col - n]);
          numberOfChecks++;
          for (let q = n; q > 0; q--) {
            positionsOnTheDirectionOfCheck.push(board[row - q][col - q]);
          }
        }
        break;
      }
    }
  }

  return {
    kingDefendingPieces,
    positionsOnTheDirectionOfCheck,
    positionsOfCheck,
    moves: Array.from(new Set(moves)),
    numberOfChecks,
  };
};

export const checkPossibleMovesInCheck = (
  item: any,
  board: any,
  row: number,
  col: number,
  positionsOfCheck: any
) => {
  let incomingPiece = item.split("_")[1];
  let pieceColor = item.split("_")[0];
  let moves: any = [];
  if (incomingPiece === "pawn") {
    moves = canPawnMove({ board, row, col, pieceColor });
  }
  if (incomingPiece === "knight") {
    moves = canKnightMove({ board, row, col, pieceColor });
  }
  if (incomingPiece === "bishop") {
    moves = canBishopMove({ board, row, col, pieceColor });
  }
  if (incomingPiece === "queen") {
    moves = canQueenMove({ board, row, col, pieceColor });
  }
  if (incomingPiece === "rook") {
    moves = canRookMove({ board, row, col, pieceColor });
  }
  let returnable: any = [];
  if (incomingPiece === "knight") {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < positionsOfCheck.length; j++) {
        if (
          moves[i].row === positionsOfCheck[j].row &&
          moves[i].column === positionsOfCheck[j].column
        ) {
          returnable.push(moves[i]);
        }
      }
    }
  }

  if (incomingPiece === "bishop") {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < positionsOfCheck.length; j++) {
        if (
          moves[i].row === positionsOfCheck[j].row &&
          moves[i].column === positionsOfCheck[j].column
        ) {
          returnable.push(moves[i]);
        }
      }
    }
  }

  return returnable;
};

export const checkPossibleMovesForEveryPiece = (
  item: any,
  board: any,
  row: number,
  col: number,
  turn: string
) => {
  let piece = board[row][col];
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
      return canPawnMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else if (incomingPiece === "knight") {
      return canKnightMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else if (incomingPiece === "bishop") {
      return canBishopMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else if (incomingPiece === "rook") {
      return canRookMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else if (incomingPiece === "king") {
      return canKingMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else if (incomingPiece === "queen") {
      return canQueenMove({
        board,
        row: item.row,
        col: item.col,
        pieceColor,
      }).find((el: any) => el.row === row && el.column === col);
    } else {
      return false;
    }
  }
};

export const canPieceMoveInCheck = (
  board: any,
  i: number,
  j: number,
  pieceColor: string
) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let moves = [];
  let numberOfChecks = 0;
  let isPinned = false;
  let attackingPiece = [];
  let directionOfPinning = "";

  //check for checks from horizontal right
  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[i][j + y]);
    if (board[i][j + y].piece !== null) {
      if (board[i][j + y].piece.includes(pieceColor)) {
        break;
      } else {
        if (
          board[i][j + y].piece.includes("rook") ||
          board[i][j + y].piece.includes("queen")
        ) {
          isPinned = true;
          directionOfPinning = "horizontal_right_to_left";
          attackingPiece.push(board[i][j + y]);
          for (let q = y; q > 0; q--) {
            attackingPiece.push(board[i][j + q]);
          }
        }
        break;
      }
    }
  }

  //check for checks from horizontal left
  for (let y = 1; y <= j; y++) {
    moves.push(board[i][j - y]);
    if (board[i][j - y].piece !== null) {
      if (board[i][j - y].piece.includes(pieceColor)) {
        break;
      } else {
        if (
          board[i][j - y].piece.includes("rook") ||
          board[i][j - y].piece.includes("queen")
        ) {
          isPinned = true;
          directionOfPinning = "horizontal_left_to_right";
          attackingPiece.push(board[i][j - y]);
          for (let q = y; q > 0; q--) {
            attackingPiece.push(board[i][j - q]);
          }
        }
        break;
      }
    }
  }

  //check for checks from vertical top
  for (let y = 1; y <= i; y++) {
    moves.push(board[i - y][j]);
    if (board[i - y][j].piece !== null) {
      if (board[i - y][j].piece.includes(pieceColor)) {
        break;
      } else {
        if (
          board[i - y][j].piece.includes("rook") ||
          board[i - y][j].piece.includes("queen")
        ) {
          isPinned = true;
          directionOfPinning = "vertical_bottom_to_top";
          attackingPiece.push(board[i - y][j]);
          for (let q = y; q > 0; q--) {
            attackingPiece.push(board[i - q][j]);
          }
        }
        break;
      }
    }
  }

  //check for checks from vertical down
  for (let y = 1; y <= spaceToBottom; y++) {
    moves.push(board[y + i][j]);
    if (board[y + i][j].piece !== null) {
      if (board[y + i][j].piece.includes(pieceColor)) {
        break;
      } else {
        if (
          board[y + i][j].piece.includes("rook") ||
          board[y + i][j].piece.includes("queen")
        ) {
          isPinned = true;
          directionOfPinning = "vertical_top_to_bottom";
          attackingPiece.push(board[y + i][j]);
          for (let q = y; q > 0; q--) {
            attackingPiece.push(board[i + q][j]);
          }
        }
        break;
      }
    }
  }

  //check for checks from diagonal to right
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
        if (
          board[i - x][j + x].piece.includes("bishop") ||
          board[i - x][j + x].piece.includes("queen")
          // board[i - x][j + x].piece.includes("pawn")
        ) {
          isPinned = true;
          directionOfPinning = "diagonal_top_right_to_left";
          attackingPiece.push(board[i - x][j + x]);
          for (let q = x; q > 0; q--) {
            attackingPiece.push(board[i - q][j + q]);
          }
        }
        break;
      }
    }
  }

  //checks from diagonal RIGHT -> LEFT/TOP
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
        if (
          board[i + o][j + o].piece.includes("bishop") ||
          board[i + o][j + o].piece.includes("queen")
          // board[i + o][j + o].piece.includes("pawn")
        ) {
          isPinned = true;
          directionOfPinning = "diagonal_bottom_right_to_left";
          attackingPiece.push(board[i + o][j + o]);
          for (let q = o; q > 0; q--) {
            attackingPiece.push(board[i + q][j + q]);
          }
        }
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
        if (
          board[i + m][j - m].piece.includes("bishop") ||
          board[i + m][j - m].piece.includes("queen")
          // board[i + m][j - m].piece.includes("pawn")
        ) {
          isPinned = true;
          directionOfPinning = "diagonal_bottom_left_to_right";
          attackingPiece.push(board[i + m][j - m]);
          for (let q = m; q > 0; q--) {
            attackingPiece.push(board[i + q][j - q]);
          }
        }
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
        if (
          board[i - n][j - n].piece.includes("bishop") ||
          board[i - n][j - n].piece.includes("queen")
          // board[i - n][j - n].piece.includes("pawn")
        ) {
          isPinned = true;
          directionOfPinning = "diagonal_top_left_to_right";
          attackingPiece.push(board[i - n][j - n]);
          for (let q = n; q > 0; q--) {
            attackingPiece.push(board[i - n][j - n]);
          }
        }
        break;
      }
    }
  }

  let cleanArray = Array.from(new Set(attackingPiece));

  return {
    attackingPiece: cleanArray,
    directionOfPinning,
    isPinned,
    moves: Array.from(new Set(moves)),
    numberOfChecks,
  };
};

/**
 * Function that gets the position of a piece that is protecting the king. Since the protection of the king is done by searching all
 * possible direction of attack, some pieces might be protecting the king but not from the direction that a check is being given. Therefore,
 * this function checks to see if the direction of check has on its opposite side (behind the specific piece) the king. If it does, it returns
 * a boolean recognizing the king is behind the piece on the direction of check.
 * @param direction
 * @param board
 * @param i
 * @param j
 * @param pieceColor
 * @returns
 */

export const isKingBehindDirection = (
  direction: string,
  board: any,
  i: number,
  j: number,
  pieceColor: string
) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let isKingBehind = false;
  if (direction === "diagonal_bottom_left_to_right") {
    let x = 0;
    while (x < i && x < spaceToRight) {
      x++;
      if (board[i - x][j + x].piece !== null) {
        if (board[i - x][j + x].piece.includes(pieceColor)) {
          if (board[i - x][j + x].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "diagonal_bottom_right_to_left") {
    let x = 0;
    while (x < i && x < j) {
      x++;
      if (board[i - x][j - x].piece !== null) {
        if (board[i - x][j - x].piece.includes(pieceColor)) {
          if (board[i - x][j - x].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "diagonal_top_left_to_right") {
    let x = 0;
    while (x < spaceToBottom && x < spaceToRight) {
      x++;
      if (board[i + x][j + x].piece !== null) {
        if (board[i + x][j + x].piece.includes(pieceColor)) {
          if (board[i + x][j + x].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "diagonal_top_right_to_left") {
    let x = 0;
    while (x < spaceToBottom && x < spaceToRight) {
      x++;
      if (board[i + x][j - x].piece !== null) {
        if (board[i + x][j - x].piece.includes(pieceColor)) {
          if (board[i + x][j - x].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "vertical_top_to_bottom") {
    for (let y = 1; y <= i; y++) {
      if (board[i - y][j].piece !== null) {
        if (board[i - y][j].piece.includes(pieceColor)) {
          if (board[i - y][j].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "vertical_bottom_to_top") {
    for (let y = 1; y <= i; y++) {
      if (board[i + y][j].piece !== null) {
        if (board[i + y][j].piece.includes(pieceColor)) {
          if (board[i + y][j].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "horizontal_left_to_right") {
    for (let y = 1; y <= spaceToRight; y++) {
      if (board[i][j + y].piece !== null) {
        if (board[i][j + y].piece.includes(pieceColor)) {
          if (board[i][j + y].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  } else if (direction === "horizontal_right_to_left") {
    for (let y = 1; y <= j; y++) {
      if (board[i][j - y].piece !== null) {
        if (board[i][j - y].piece.includes(pieceColor)) {
          if (board[i][j - y].piece === `${pieceColor}_king`) {
            isKingBehind = true;
          }
        }
      }
    }
  }
  return isKingBehind;
};
