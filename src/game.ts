/** @format */
import { IPieceSearch, ISquare, TBoard } from "./types";

export const searchForKings = (board: TBoard) => {
  let kings = { blackKingPositionsX: 0, blackKingPositionsY: 3, whiteKingPositionsX: 7, whiteKingPositionsY: 3 };
  board.flat().forEach(c => {
    if (c.piece === "black_king") kings = {...kings, blackKingPositionsX: c.row, blackKingPositionsY: c.column};
    if (c.piece === "white_king") kings = {...kings, whiteKingPositionsX: c.row, whiteKingPositionsY: c.column};
  });
  return kings;
};

export const canPawnMove = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch): { moves: ISquare[]; protectedSquares: ISquare[] } => {
  const moves: ISquare[] = [];
  const protectedSquares: ISquare[] = [];
  const direction = pieceColor === 'white' ? -1 : 1;
  const initialRow = pieceColor === 'white' ? 6 : 1;

  // Helper function to check if a move is valid
  const isValidCapture = (square: ISquare) => 
    square.piece && !square.piece.includes(pieceColor);

  // Add diagonal squares to protected squares
  [-1, 1].forEach(offset => {
    if (board[row + direction]?.[col + offset]) {
      protectedSquares.push(board[row + direction][col + offset]);
      // Add diagonal captures to moves if enemy piece present
      if (isValidCapture(board[row + direction][col + offset])) {
        moves.push(board[row + direction][col + offset]);
      }
    }
  });

  // Forward moves
  const forward = board[row + direction]?.[col];
  if (forward?.piece === null) {
    moves.push(forward);
    // Double move from initial position
    if (row === initialRow && board[row + direction * 2]?.[col]?.piece === null) {
      moves.push(board[row + direction * 2][col]);
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
}: IPieceSearch): ISquare[] => {
  const moves: ISquare[] = [];
  const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  for (const [dx, dy] of directions) {
    let x = row + dx, y = col + dy;
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      if (board[x][y].piece?.includes(pieceColor)) break;
      moves.push(board[x][y]);
      if (board[x][y].piece) break;
      x += dx;
      y += dy;
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
  const moves: ISquare[] = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  for (const [dx, dy] of directions) {
    let x = row + dx, y = col + dy;
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      if (board[x][y].piece?.includes(pieceColor)) break;
      moves.push(board[x][y]);
      if (board[x][y].piece) break;
      x += dx;
      y += dy;
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
}: IPieceSearch): ISquare[] => {
  // Queen moves are a combination of rook and bishop moves
  const rookMoves = canRookMove({ board, row, col, pieceColor });
  const bishopMoves = canBishopMove({ board, row, col, pieceColor });
  
  // Combine both move sets
  return [...rookMoves, ...bishopMoves];
};

export const checkForKingChecks = ({
  board,
  row,
  col,
  pieceColor,
}: IPieceSearch) => {
  const moves: ISquare[] = [];
  let numberOfChecks = 0;
  const positionsOfCheck: ISquare[] = [];
  const positionsOnTheDirectionOfCheck: ISquare[] = [];
  const kingDefendingPieces: ISquare[] = [];
  const oppositeColor = pieceColor === "white" ? "black" : "white";

  // Check knight moves
  const knightPattern = [
    { x: 2, y: -1 }, { x: 2, y: 1 }, { x: 1, y: -2 }, { x: 1, y: 2 },
    { x: -2, y: -1 }, { x: -2, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 2 },
  ];
  
  // Check for knight threats
  knightPattern.forEach(pattern => {
    const newRow = row + pattern.x;
    const newCol = col + pattern.y;
    if (board[newRow]?.[newCol]) {
      moves.push(board[newRow][newCol]);
      if (board[newRow][newCol].piece === `${oppositeColor}_knight`) {
        positionsOfCheck.push(board[newRow][newCol]);
        numberOfChecks++;
      }
    }
  });

  // Check straight and diagonal lines
  const directions = [
    { dx: 0, dy: 1 },   // right
    { dx: 0, dy: -1 },  // left
    { dx: -1, dy: 0 },  // up
    { dx: 1, dy: 0 },   // down
    { dx: -1, dy: 1 },  // up-right
    { dx: 1, dy: 1 },   // down-right
    { dx: 1, dy: -1 },  // down-left
    { dx: -1, dy: -1 }, // up-left
  ];

  directions.forEach(({ dx, dy }) => {
    let x = row + dx;
    let y = col + dy;
    let path: ISquare[] = [];

    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const square = board[x][y];
      moves.push(square);
      path.push(square);

      if (square.piece) {
        if (square.piece.includes(pieceColor)) {
          kingDefendingPieces.push(square);
          break;
        }
        
        const isDiagonal = dx !== 0 && dy !== 0;
        const isThreatening = 
          (!isDiagonal && (square.piece.includes("rook") || square.piece.includes("queen"))) ||
          (isDiagonal && (square.piece.includes("bishop") || square.piece.includes("queen")));

        if (isThreatening) {
          numberOfChecks++;
          positionsOfCheck.push(square);
          positionsOnTheDirectionOfCheck.push(...path);
        }
        break;
      }

      x += dx;
      y += dy;
    }
  });

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
  const [pieceColor, incomingPiece] = item.split('_');
  let moves: any = [];

  // Get possible moves based on piece type
  switch (incomingPiece) {
    case 'pawn':
      moves = canPawnMove({ board, row, col, pieceColor });
      break;
    case 'knight':
    case 'bishop':
      const moveFunc = incomingPiece === 'knight' ? canKnightMove : canBishopMove;
      moves = moveFunc({ board, row, col, pieceColor });
      // Filter moves that can capture checking piece
      return moves.filter((move: ISquare) => 
        positionsOfCheck.some((pos: ISquare) => 
          move.row === pos.row && move.column === pos.column
        )
      );
    case 'queen':
      moves = canQueenMove({ board, row, col, pieceColor });
      break;
    case 'rook':
      moves = canRookMove({ board, row, col, pieceColor });
      break;
  }

  return [];
};

export const checkPossibleMovesForEveryPiece = (
  item: any,
  board: any,
  row: number,
  col: number,
  turn: string
) => {
  const piece = board[row][col];
  const [pieceColor, incomingPiece] = item.piece.split("_");

  // Check if move is valid
  if (piece.piece?.includes(pieceColor) || turn !== pieceColor) {
    return false;
  }

  type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'king' | 'queen';

  // Get possible moves based on piece type
  const moveMap = {
    pawn: () => canPawnMove({ board, row: item.row, col: item.col, pieceColor }).moves,
    knight: () => canKnightMove({ board, row: item.row, col: item.col, pieceColor }),
    bishop: () => canBishopMove({ board, row: item.row, col: item.col, pieceColor }),
    rook: () => canRookMove({ board, row: item.row, col: item.col, pieceColor }),
    king: () => canKingMove({ board, row: item.row, col: item.col, pieceColor }),
    queen: () => canQueenMove({ board, row: item.row, col: item.col, pieceColor })
  };

  const getMoves = moveMap[incomingPiece as PieceType];
  return getMoves ? getMoves().find((el: any) => el.row === row && el.column === col) : false;
};

export const canPieceMoveInCheck = (board: any, row: number, col: number, pieceColor: string) => {
  const moves: any[] = [];
  let isPinned = false;
  let attackingPiece: any[] = [];
  let directionOfPinning = "";

  // All possible directions: horizontal, vertical, and diagonal
  const directions = [
    { dx: 0, dy: 1, name: "horizontal_right_to_left" },    // right
    { dx: 0, dy: -1, name: "horizontal_left_to_right" },   // left
    { dx: -1, dy: 0, name: "vertical_bottom_to_top" },     // up
    { dx: 1, dy: 0, name: "vertical_top_to_bottom" },      // down
    { dx: -1, dy: 1, name: "diagonal_top_right_to_left" }, // up-right
    { dx: 1, dy: 1, name: "diagonal_bottom_right_to_left"} // down-right
  ];

  directions.forEach(({ dx, dy, name }) => {
    let x = row + dx;
    let y = col + dy;
    let pathSquares = [];

    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const piece = board[x][y];
      if (!piece) break;
      
      pathSquares.push(piece);
      
      if (piece.piece?.includes(pieceColor)) {
        break;
      } else if (piece.piece) {
        const isDiagonal = dx !== 0 && dy !== 0;
        const isHorizontalVertical = dx === 0 || dy === 0;
        
        if ((isHorizontalVertical && (piece.piece?.includes("rook") || piece.piece?.includes("queen"))) ||
            (isDiagonal && (piece.piece?.includes("bishop") || piece.piece?.includes("queen")))) {
          isPinned = true;
          directionOfPinning = name;
          attackingPiece = [piece, ...pathSquares];
        }
        break;
      }
      
      x += dx;
      y += dy;
    }
    moves.push(...pathSquares);
  });

  return { moves, numberOfChecks: attackingPiece.length, isPinned, attackingPiece, directionOfPinning };
};



export const isKingBehindDirection = (
  direction: string,
  board: any,
  i: number,
  j: number,
  pieceColor: string
) => {
  const delta = {
    "diagonal_bottom_left_to_right": [1, -1],
    "diagonal_bottom_right_to_left": [1, 1],
    "diagonal_top_left_to_right": [-1, -1],
    "diagonal_top_right_to_left": [-1, 1],
    "vertical_top_to_bottom": [-1, 0],
    "vertical_bottom_to_top": [1, 0],
    "horizontal_left_to_right": [0, 1],
    "horizontal_right_to_left": [0, -1]
  };

  console.log(direction);

  // @ts-ignore
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
  const moveMap = {
    rook: canRookMove,
    knight: canKnightMove,
    bishop: canBishopMove,
    queen: canQueenMove,
    king: canKingMove,
    pawn: canPawnMove
  } as const;

  const type = pieceType.split('_')[1] as keyof typeof moveMap;
  return moveMap[type]?.({ board, row, col, pieceColor }) || false;
};

export const findMatchingSquare = (item: any, turn: string, kingChecks: any, row: number, col: number, board: any) => {
  const isKingMove = item.piece === `${turn}_king`;
  const isKingInCheck = kingChecks.blackKingIsChecked || kingChecks.whiteKingIsChecked;

  // Check if the target square exists in available moves
  const isValidMove = (moves: ISquare[]) => 
    moves?.find((el: ISquare) => el.row === row && el.column === col);

  if (isKingMove) {
    return isValidMove(item.availableMovesInCheck);
  }

  if (isKingInCheck) {
    return isValidMove(item.availableMovesInCheck);
  }

  return item.availableMovesInPinned?.length
    ? isValidMove(item.availableMovesInPinned)
    : checkPossibleMovesForEveryPiece(item, board, row, col, turn);
};
