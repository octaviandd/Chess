/** @format */

export const searchForKings = (board: any, kingColor: any) => {
  let kingsPositions = {
    blackKingPositionsX: 0,
    blackKingPositionsY: 3,
    whiteKingPositionsX: 7,
    whiteKingPositionsY: 3,
  };
  if (kingColor === "black") {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].piece === "black_king") {
          kingsPositions.blackKingPositionsX = board[i][j].row;
          kingsPositions.blackKingPositionsY = board[i][j].column;
        }
      }
    }
  } else if (kingColor === "white") {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].piece === "white_king") {
          kingsPositions.whiteKingPositionsX = board[i][j].row;
          kingsPositions.whiteKingPositionsY = board[i][j].column;
        }
      }
    }
  }
  return kingsPositions;
};

export const canPawnMove = (board: any, i: any, j: any, pieceColor: string) => {
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

export const canKnightMove = (board: any, i: any, j: any) => {
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

export const canBishopMove = (
  board: any,
  i: any,
  j: any,
  pieceColor: string
) => {
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

export const canRookMove = (board: any, i: any, j: any, pieceColor: string) => {
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

export const canKingMove = (board: any, i: any, j: any, pieceColor: string) => {
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

export const canQueenMove = (
  board: any,
  i: any,
  j: any,
  pieceColor: string
) => {
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

export const checkBlackKing = (
  board: any,
  i: number,
  j: number,
  pieceColor: string
) => {
  let spaceToRight = 7 - j;
  let spaceToBottom = 7 - i;
  let moves = [];
  let numberOfChecks = 0;
  let positionsOfCheck: any = [];
  let positionsOnTheDirectionOfCheck: any = [];

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
    if (board[i + m.x] && board[i + m.x][j + m.y]) {
      moves.push(board[i + m.x][j + m.y]);

      if (
        board[i + m.x][j + m.y].piece &&
        board[i + m.x][j + m.y].piece === "white_knight"
      ) {
        positionsOfCheck.push(board[i + m.x][j + m.y]);
      }
    }
  }

  //check for checks from horizontal right
  for (let y = 1; y <= spaceToRight; y++) {
    moves.push(board[i][j + y]);
    if (board[i][j + y].piece !== null) {
      if (board[i][j + y].piece.includes(pieceColor)) {
        break;
      } else {
        positionsOfCheck.push(board[i][j + y]);
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
        positionsOfCheck.push(board[i][j - y]);
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
        positionsOfCheck.push(board[i - y][j]);
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
        positionsOfCheck.push(board[y + i][j]);
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
        positionsOfCheck.push([i - x][j + x]);
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
        positionsOnTheDirectionOfCheck = [];
        break;
      }
      if (!board[i + o][j + o].piece.includes(pieceColor)) {
        moves.push(board[i + o][j + o]);
        if (
          board[i + o][j + o].piece.includes("bishop") ||
          board[i + o][j + o].piece.includes("queen") ||
          board[i + o][j + o].piece.includes("pawn")
        ) {
          positionsOfCheck.push(board[i + o][j + o]);
          numberOfChecks++;
          positionsOnTheDirectionOfCheck.push(board[i + o][j + o]);
        } else {
          positionsOnTheDirectionOfCheck = [];
        }
        break;
      }
    } else {
      positionsOnTheDirectionOfCheck.push(board[i + o][j + o]);
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
        positionsOfCheck.push(board[i + m][j - m]);
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
        positionsOfCheck.push(board[i - n][j - n]);
        break;
      }
    }
  }

  return {
    positionsOnTheDirectionOfCheck,
    positionsOfCheck,
    moves: Array.from(new Set(moves)),
    numberOfChecks,
  };
};

export const checkPossibleMovesInCheck = (
  item: any,
  board: any,
  row: any,
  col: any,
  positionsOfCheck: any
) => {
  let incomingPiece = item.split("_")[1];
  let pieceColor = item.split("_")[0];
  let moves: any = [];
  if (incomingPiece === "pawn") {
    moves = canPawnMove(board, row, col, pieceColor);
  }
  if (incomingPiece === "knight") {
    moves = canKnightMove(board, row, col);
  }
  if (incomingPiece === "bishop") {
    moves = canBishopMove(board, row, col, pieceColor);
  }
  if (incomingPiece === "queen") {
    moves = canQueenMove(board, row, col, pieceColor);
  }
  if (incomingPiece === "rook") {
    moves = canRookMove(board, row, col, pieceColor);
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
