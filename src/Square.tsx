/** @format */

import styled from "styled-components";
import BlackKing from "./Pieces/BlackKing";
import BlackPawn from "./Pieces/BlackPawn";
import WhiteKing from "./Pieces/WhiteKing";
import WhitePawn from "./Pieces/WhitePawn";
import BlackPiece from "./Pieces/BlackPiece"
import WhitePiece from "./Pieces/WhitePiece"
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
import { ItemTypes } from "./ItemTypes";
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
  ISquare,
  IKingChecks,
  TBoard,
} from "./types";

const setDefaultPieces = (
  piece: any,
  row: number,
  col: number,
  board: TBoard,
  kingChecks: IKingChecks,
  setKingChecks: any
) => {
  if (piece === "black_rook" || piece === "black_queen" || piece === "black_knight" || piece === "black_bishop") {
    return (
      <BlackPiece
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        pieceColor="black"
        pieceType={piece}
        pieceSVG={piece === "black_rook" ? BlackRookSVG : piece === "black_knight" ? BlackKnightSVG : piece === "black_bishop" ? BlackBishopSVG : BlackQueenSVG}
      >
      </BlackPiece>
    )
  } else if (piece === "black_king") {
    return (
      <BlackKing
        row={row}
        col={col}
        board={board}
        pieceColor="black"
        kingsChecks={kingChecks}
        setKingChecks={setKingChecks}
        pieceType={piece}
        pieceSVG={BlackKingSVG}
      ></BlackKing>
    );
  } else if (piece === "black_pawn") {
    return (
      <BlackPawn
        row={row}
        col={col}
        board={board}
        pieceColor="black"
        kingsChecks={kingChecks}
        pieceType={piece}
        pieceSVG={BlackPawnSVG}
      ></BlackPawn>
    );
  } else if (piece === "white_rook" || piece === "white_queen" || piece === "white_knight" || piece === "white_bishop") {
    return (
      <WhitePiece
        row={row}
        col={col}
        board={board}
        kingsChecks={kingChecks}
        pieceColor="white"
        pieceType={piece}
        pieceSVG={piece === "white_rook" ? WhiteRookSVG : piece === "white_knight" ? WhiteKnightSVG : piece === "white_bishop" ? WhiteBishopSVG : WhiteQueenSVG}
      ></WhitePiece>
    );
  } else if (piece === "white_king") {
    return (
      <WhiteKing
        row={row}
        col={col}
        board={board}
        pieceColor="white"
        pieceType={piece}
        kingsChecks={kingChecks}
        setKingChecks={setKingChecks}
        pieceSVG={WhiteKingSVG}
      ></WhiteKing>
    );
  } else if (piece === "white_pawn") {
    return (
      <WhitePawn
        row={row}
        col={col}
        board={board}
        pieceColor="white"
        pieceType={piece}
        kingsChecks={kingChecks}
        pieceSVG={WhitePawnSVG}
      ></WhitePawn>
    );
  } else {
    return null;
  }
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

  const [{ isOver, canDrop }, drop]: any = useDrop(
    () => ({
      accept: Object.keys(ItemTypes).map((k) => ItemTypes[k]),
      canDrop: (item: any) => findMatchingSquare(item, turn, kingChecks, row, col, board),
      drop: (item: IPieceToSquare) => {
        let copyOfBoard = board;
        copyOfBoard[row][col].piece = item.piece;
        copyOfBoard[item.row][item.col].piece = null;

        setBoard((prevState: TBoard) => {
          let copy = [...prevState];
          copy[row][col].piece = item.piece;
          board[item.row][item.col].piece = null;
          return copy;
        });

        let {blackKingPositionsX, blackKingPositionsY, whiteKingPositionsX, whiteKingPositionsY} = searchForKings(copyOfBoard);
        let { numberOfChecks, positionsOfCheck, positionsOnTheDirectionOfCheck, kingDefendingPieces} = checkForKingChecks({
          board: copyOfBoard,
          row: blackKingPositionsX,
          col: blackKingPositionsY,
          pieceColor: "black",
        });

        let { numberOfChecks: numberOfChecksWhite, positionsOfCheck: positionsOfCheckWhite, positionsOnTheDirectionOfCheck: positionsOnTheDirectionOfCheckWhite, kingDefendingPieces: kingDefendingPiecesWhite} = checkForKingChecks({
          board: copyOfBoard,
          row: whiteKingPositionsX,
          col: whiteKingPositionsY,
          pieceColor: "white",
        });

        setKingChecks((prevState: IKingChecks) => ({
          ...prevState,
          whiteKingIsChecked: numberOfChecksWhite !== 0,
          whiteKingPositionsOfCheck: positionsOfCheckWhite,
          whiteKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheckWhite,
          whiteKingDefendingPieces: kingDefendingPiecesWhite,
          blackKingIsChecked: numberOfChecks !== 0,
          blackKingPositionsOfCheck: positionsOfCheck,
          blackKingPositionsOnTheDirectionOfCheck:
            positionsOnTheDirectionOfCheck,
          blackKingDefendingPieces: kingDefendingPieces,
        }));
        handleTurn();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [turn, kingChecks.blackKingIsChecked, kingChecks.whiteKingIsChecked, board]
  );

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
