/** @format */

interface ISquare {
  row: number;
  column: number;
  piece: null | string;
}

export type TBoard = [ISquare[]];

export type CSSSquareProps = {
  piece: boolean;
  color: string;
};

export interface ISquareFunction {
  color: string;
  row: number;
  col: number;
  board: TBoard;
  setBoard: any;
  setPossibleMoves: any;
  turn: string;
  piece: any;
  handleTurn: any;
  kingChecks: IKingChecks;
  setKingChecks: any;
}

export interface IPieceToSquare {
  piece: string;
  row: number;
  col: number;
  availableMovesInCheck: [];
  availableMovesInPinned: [];
}

export interface IKingChecks {
  whiteKingIsChecked: boolean;
  whiteKingPositionsOfCheck: ISquare[];
  whiteKingPositionsOnTheDirectionOfCheck: ISquare[];
  whiteKingDefendingPieces: ISquare[];
  blackKingIsChecked: boolean;
  blackKingPositionsOfCheck: [];
  blackKingPositionsOnTheDirectionOfCheck: ISquare[];
  blackKingDefendingPieces: ISquare[];
  blackCheckMated: boolean;
  whiteCheckMated: boolean;
}

export interface IPiece {
  row: number;
  col: number;
  board: TBoard;
  kingsChecks: IKingChecks;
}

export interface IKingPiece extends IPiece {
  setKingChecks: any;
}

export interface IPieceSearch {
  board: TBoard;
  row: number;
  col: number;
  pieceColor: string;
}
