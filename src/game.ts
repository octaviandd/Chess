/** @format */

import { IPieceSearch, ISquare, TBoard } from "./types";

export const searchForKings = (board: TBoard) => {
  let kingsPositions = {
    blackKingPositionsX: 0,
    blackKingPositionsY: 3,
    whiteKingPositionsX: 7,
    whiteKingPositionsY: 3,
  };

  board.forEach(row => row.forEach(col => {
    if (col.piece === "black_king") {
      kingsPositions.blackKingPositionsX = col.row;
      kingsPositions.blackKingPositionsY = col.column;
    }
  }))

  board.forEach(row => row.forEach(col => {
    if (col.piece === "white_king") {
      kingsPositions.whiteKingPositionsX = col.row;
      kingsPositions.whiteKingPositionsY = col.column;
    }
  }))
  return kingsPositions;
};

export const canPawnMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): { moves: ISquare[]; protectedSquares: ISquare[] } => {
  let moves = [];
  let protectedSquares = [];
  const isWhite = pieceColor === 'white';
  const direction = isWhite ? -1 : 1;
  const initialRow = isWhite ? 6 : 1;

  if (board[row + direction] && board[row + direction][col + 1]) {
    protectedSquares.push(board[row + direction][col + 1]);
  }
  if (board[row + direction] && board[row + direction][col - 1]) {
    protectedSquares.push(board[row + direction][col - 1]);
  }
  if (row === initialRow) {
    if (board[row + direction] && board[row + direction][col + 1] && !board[row + direction][col + 1].piece?.includes(pieceColor)) {
      moves.push(board[row + direction][col + 1]);
    }
    if (board[row + direction] && board[row + direction][col - 1] && !board[row + direction][col - 1].piece?.includes(pieceColor)) {
      moves.push(board[row + direction][col - 1]);
    }

    if (board[row + direction * 2] && board[row + direction * 2][col] && board[row + direction * 2][col].piece !== null) {
      moves.push(board[row + direction][col]);
    } else if (board[row + direction][col] && board[row + direction][col].piece === null && board[row + direction * 2][col] && board[row + direction * 2][col].piece === null) {
      moves.push(board[row + direction][col], board[row + direction * 2][col]);
    }
  } else {
    if (board[row + direction] && board[row + direction][col + 1] && !board[row + direction][col + 1].piece?.includes(pieceColor)) {
      moves.push(board[row + direction][col + 1]);
    }
    if (board[row + direction] && board[row + direction][col - 1] && !board[row + direction][col - 1].piece?.includes(pieceColor)) {
      moves.push(board[row + direction][col - 1]);
    }

    if (board[row + direction] && board[row + direction][col] && board[row + direction][col].piece === null) {
      moves.push(board[row + direction][col]);
    }
  }
  return { moves, protectedSquares };
};


export const canKnightMove = ({
  board,
  row,
  col,
}: IPieceSearch): ISquare[] => {
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

  return knightMoves
  .filter((move) => board[row + move.x] && board[row + move.x][col + move.y])
  .map((move) => board[row + move.x][col + move.y]);
};

export const canBishopMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch) => {
  const directions = [  { x: -1, y: -1 },  { x: -1, y: 1 },  { x: 1, y: -1 },  { x: 1, y: 1 }];

const isValidMove = (r: number, c: number, pieceColor: string, board: any) => {
  if (!board[r] || !board[r][c]) {
    return false;
  }
  if (board[r][c].piece === null) {
    return true;
  }
  return !board[r][c].piece?.includes(pieceColor);
}

let moves = [];
for (const {x, y} of directions) {
  let i = 1;
  while (isValidMove(row + (i * x), col + (i * y), pieceColor, board)) {
    moves.push(board[row + (i * x)][col + (i * y)]);
    i++;
  }
}
return moves;
};

export const canRookMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): ISquare[] => {
  const directions = [  { x: 0, y: 1 },  { x: 0, y: -1 },  { x: 1, y: 0 },  { x: -1, y: 0 }];

const isValidMove = (r: number, c: number, pieceColor: string, board: any) => {
  if (!board[r] || !board[r][c]) {
    return false;
  }
  if (board[r][c].piece === null) {
    return true;
  }
  return !board[r][c].piece?.includes(pieceColor);
}
let moves = [];
for (const {x, y} of directions) {
  for (let i = 1; isValidMove(row + (i * x), col + (i * y), pieceColor, board); i++) {
    moves.push(board[row + (i * x)][col + (i * y)]);
  }
}
return moves;
};

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

export const canQueenMove = ({
  board,
  row,
  col,
  pieceColor,
}: any): ISquare[] => {
  let moves = [];

  let directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
  ];

  for (let direction of directions) {
    let x = row + direction.x;
    let y = col + direction.y;
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        moves.push(board[x][y]);
        if (board[x][y].piece !== null) {
            if (board[x][y].piece.includes(pieceColor)) {
                break;
            } else {
                break;
            }
        }
        x += direction.x;
        y += direction.y;
    }
  }
  return moves;
};

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
      }).moves.find((el: any) => el.row === row && el.column === col);
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

export const canPieceMoveInCheck = (board: any, i: number, j: number, pieceColor: string) => {
  const spaceToRight = 7 - j;
  const spaceToBottom = 7 - i;
  const moves: any = [];
  let isPinned = false;
  let attackingPiece: any = [];
  let directionOfPinning = "";

  const checkAndPush = (piece: any, direction: any) => {
    if (piece === null) {
      moves.push(piece);
    } else if (piece?.piece?.includes(pieceColor)) {
      return true;
    } else {
      if (
        piece?.piece?.includes("rook") ||
        piece?.piece?.includes("queen")
      ) {
        isPinned = true;
        directionOfPinning = direction;
        attackingPiece.push(piece);
        for (let q = moves.length - 1; q >= 0; q--) {
          const movedPiece = moves[q];
          attackingPiece.push(movedPiece);
          if (movedPiece === piece) break;
        }
      }
      moves.push(piece);
      return true;
    }
    return false;
  };

  for (let y = 1; y <= spaceToRight; y++) {
    if (checkAndPush(board[i][j + y], "horizontal_right_to_left")) break;
  }

  for (let y = 1; y <= j; y++) {
    if (checkAndPush(board[i][j - y], "horizontal_left_to_right")) break;
  }

  for (let y = 1; y <= i; y++) {
    if (checkAndPush(board[i - y][j], "vertical_bottom_to_top")) break;
  }

  for (let y = 1; y <= spaceToBottom; y++) {
    if (checkAndPush(board[y + i][j], "vertical_top_to_bottom")) break;
  }

  let x = 0;
  while (x < i && x < spaceToRight) {
    x++;
    if (checkAndPush(board[i - x][j + x], "diagonal_top_right_to_left")) break;
  }

  let o = 0;
  while (o < spaceToBottom && o < spaceToRight) {
    o++;
    if (checkAndPush(board[i + o][j + o], "diagonal_bottom_right_to_left")) break;
  }

  return {
    moves,
    numberOfChecks: attackingPiece.length,
    isPinned,
    attackingPiece,
    directionOfPinning
  };
};

export const isKingBehindDirection = (
  direction: string,
  board: any,
  i: number,
  j: number,
  pieceColor: string
) => {
  const delta = {
    diagonal_bottom_left_to_right: [1, -1],
    diagonal_bottom_right_to_left: [1, 1],
    diagonal_top_left_to_right: [-1, -1],
    diagonal_top_right_to_left: [-1, 1],
    vertical_top_to_bottom: [-1, 0],
    vertical_bottom_to_top: [1, 0],
    horizontal_left_to_right: [0, 1],
    horizontal_right_to_left: [0, -1]
  };

  //@ts-ignore
  let [dx, dy] = delta[direction];
  let x = i + dx, y = j + dy;
  while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
    if (board[x][y].piece !== null) {
      if (board[x][y].piece.includes(pieceColor) && board[x][y].piece === `${pieceColor}_king`) {
        return true;
      } else {
        break;
      }
    }
    x += dx;
    y += dy;
  }
  return false;
};


export const canPieceMove = (board: any, row: any, col: any, pieceColor: string, pieceType: string) => {
  switch (pieceType) {
    case "black_rook":
    case "white_rook":
      return canRookMove({ board, row, col, pieceColor });
    case "white_knight":
    case "black_knight":
      return canKnightMove({ board, row, col, pieceColor });
    case "white_bishop":
    case "black_bishop":
      return canBishopMove({board, row, col, pieceColor});
    case "black_queen":
    case "white_queen":
      return canQueenMove({ board, row, col, pieceColor });
    case "white_king":
    case "black_king":
      return canKingMove({ board, row, col, pieceColor });
    case "black_pawn":
    case "white_pawn":
      return canPawnMove({ board, row, col, pieceColor });
    default:
      return false
  }
}

export const findMatchingSquare = (item: any, turn: string, kingChecks : any, row: number, col: number, board: any) => {
    const kingPiece = turn === "white" ? "white_king" : "black_king";
    if (item.piece === kingPiece) {
      return item.availableMovesInCheck?.find(
        (el: ISquare) => el.row === row && el.column === col
      );
    }

    if (kingChecks.blackKingIsChecked || kingChecks.whiteKingIsChecked) {
      if (item.availableMovesInCheck) {
        return item.availableMovesInCheck?.find(
          (el: ISquare) => el.row === row && el.column === col
        );
      }
    } else {
      if (item.availableMovesInPinned?.length) {
        return item.availableMovesInPinned?.find(
          (el: ISquare) => el.row === row && el.column === col
        );
      } else {
        return checkPossibleMovesForEveryPiece(item, board, row, col, turn);
      }
    }
  }
