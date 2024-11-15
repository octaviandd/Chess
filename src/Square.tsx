/** @format */

import styled from "styled-components";
import King from "./Pieces/King";
import Pawn from "./Pieces/Pawn";
import Piece from "./Pieces/Piece"
import BlackRookSVG from "./Pieces/svgs/black_rook.svg";
import BlackPawnSVG from "./Pieces/svgs/black_pawn.svg"
import BlackKingSVG from "./Pieces/svgs/black_king.svg";
import BlackKnightSVG from "./Pieces/svgs/black_knight.svg";
import BlackBishopSVG from "./Pieces/svgs/black_bishop.svg";
import BlackQueenSVG from "./Pieces/svgs/black_queen.svg";
import WhiteRookSVG from "./Pieces/svgs/white_rook.svg";
import WhiteBishopSVG from "./Pieces/svgs/white_bishop.svg";
import WhiteKnightSVG from "./Pieces/svgs/white_knight.svg";
import WhiteQueenSVG from "./Pieces/svgs/white_queen.svg";
import WhitePawnSVG from "./Pieces/svgs/white_pawn.svg";
import WhiteKingSVG from "./Pieces/svgs/white_king.svg";

import { useDrop } from "react-dnd";
import { Overlay } from "./Overlay";
import {
  searchForKings,
  findMatchingSquare,
  checkForKingChecks,
} from "./game";
import {
  CSSSquareProps,
  ISquareFunction,
  IPieceToSquare,
  ItemTypes,
  IKingChecks,
  TBoard,
} from "./types";

const pieceSVGs = {
  black_rook: BlackRookSVG,
  black_knight: BlackKnightSVG,
  black_bishop: BlackBishopSVG,
  black_queen: BlackQueenSVG,
  black_king: BlackKingSVG,
  black_pawn: BlackPawnSVG,
  white_rook: WhiteRookSVG,
  white_knight: WhiteKnightSVG,
  white_bishop: WhiteBishopSVG,
  white_queen: WhiteQueenSVG,
  white_king: WhiteKingSVG,
  white_pawn: WhitePawnSVG,
};

const setDefaultPieces = (
  piece: string | null,
  row: number,
  col: number,
  board: TBoard,
  kingChecks: IKingChecks,
  setKingChecks: any,
) => {
  if (!piece) return null;

  const color = piece.split("_")[0];
  const pieceSVG = pieceSVGs[piece as keyof typeof pieceSVGs];
  const pieceProps = {
    row,
    col,
    board,
    pieceColor: color,
    kingsChecks: kingChecks,
    setKingChecks,
    pieceType: piece,
    pieceSVG,
  };

  if (piece.includes('king')) return <King {...pieceProps} />;
  if (piece.includes('pawn')) return <Pawn {...pieceProps} />;
  return <Piece {...pieceProps} />;
};

export default function Square({
  board,
  color,
  row,
  col,
  setBoard,
  turn,
  handleTurn,
  setKingChecks,
  kingChecks,
}: ISquareFunction) {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: Object.values(ItemTypes),
    canDrop: (item) => !!findMatchingSquare(item, turn, kingChecks, row, col, board),
    drop: (item: IPieceToSquare) => {
      const updatedBoard: TBoard = [...board];
      updatedBoard[row][col].piece = item.piece;
      updatedBoard[item.row][item.col].piece = null;

      setBoard(updatedBoard);

      const {
        blackKingPositionsX,
        blackKingPositionsY,
        whiteKingPositionsX,
        whiteKingPositionsY,
      } = searchForKings(updatedBoard);

      const blackKingCheck = checkForKingChecks({
        board: updatedBoard,
        row: blackKingPositionsX,
        col: blackKingPositionsY,
        pieceColor: "black",
      });

      const whiteKingCheck = checkForKingChecks({
        board: updatedBoard,
        row: whiteKingPositionsX,
        col: whiteKingPositionsY,
        pieceColor: "white",
      });

      setKingChecks((prevState: any) => ({
        ...prevState,
        whiteKingIsChecked: whiteKingCheck.numberOfChecks !== 0,
        whiteKingPositionsOfCheck: whiteKingCheck.positionsOfCheck,
        whiteKingPositionsOnTheDirectionOfCheck: whiteKingCheck.positionsOnTheDirectionOfCheck,
        whiteKingDefendingPieces: whiteKingCheck.kingDefendingPieces,
        blackKingIsChecked: blackKingCheck.numberOfChecks !== 0,
        blackKingPositionsOfCheck: blackKingCheck.positionsOfCheck,
        blackKingPositionsOnTheDirectionOfCheck: blackKingCheck.positionsOnTheDirectionOfCheck,
        blackKingDefendingPieces: blackKingCheck.kingDefendingPieces,
      }));

      handleTurn();
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <SquareDiv color={color} piece={board[row][col].piece !== null} ref={drop}>
      {setDefaultPieces(board[row][col].piece, row, col, board, kingChecks, setKingChecks)}
      {isOver && !canDrop && <Overlay type='illegal-move-hover' />}
      {!isOver && canDrop && <Overlay type='legal-move-hover' />}
      {isOver && canDrop && <Overlay type='possible-move' />}
    </SquareDiv>
  );
}

const SquareDiv = styled.div<CSSSquareProps>`
  position: relative;
  width: 80px;
  height: 80px;
  background-color: ${(props) =>
    props.color === "dark" ? "#b58863" : "#f0d9b5"};
`;
