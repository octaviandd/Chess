/** @format */

const main = document.querySelector("#main");

let element = document.querySelector("#test");

class Chess {
  constructor() {
    this.row;
    this.column;
    this.board = undefined;
    this.currentlySelectedPiece = undefined;
    this.availableMovePositions = [];
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter() {}
  dragLeave() {}
  dragDrop(e) {
    console.log(this.availableMovePositions);
    const { row, column } = e.target.dataset;
    if (
      row == this.currentlySelectedPiece.row &&
      column == this.currentlySelectedPiece.column
    ) {
      return;
    }
    if (
      this.currentlySelectedPiece &&
      this.checkIfMoveIsAvailable(this.availableMovePositions, { row, column })
    ) {
      this.board[row][column].div.classList.add(
        this.currentlySelectedPiece.piece
      );
      this.board[row][column].piece = this.currentlySelectedPiece.piece;
      this.currentlySelectedPiece.div.classList.remove(
        this.currentlySelectedPiece.piece
      );
    }
    this.deselectPosition();
  }

  checkIfMoveIsAvailable(availableMoves, { row, column }) {
    let isAvailable = false;
    availableMoves.map((item) => item.row === row && column);
    for (let i in availableMoves) {
      if (availableMoves[i].row == row && availableMoves[i].column == column) {
        isAvailable = true;
        break;
      }
    }
    return isAvailable;
  }

  createChessTable() {
    let matrix = [];

    for (let i = 0; i < 8; i++) {
      let row = [];
      matrix.push(row);
      for (let j = 0; j < 8; j++) {
        let square = document.createElement("div");
        if (i % 2 !== 0) {
          if (j % 2 !== 0) {
            square.classList.add("dark");
          } else {
            square.classList.add("light");
          }
        } else if (i % 2 == 0) {
          if (j % 2 !== 0) {
            square.classList.add("light");
          } else {
            square.classList.add("dark");
          }
        }
        square.classList.add("square");
        square.dataset.column = j;
        square.dataset.row = i;
        square.setAttribute("draggable", true);
        square.addEventListener("dragstart", (e) => this.selectPiece(i, j));
        square.addEventListener("dragend", (e) => this.movePiece(e));
        square.addEventListener("dragover", (e) => this.dragOver(e));
        square.addEventListener("dragenter", (e) => this.dragEnter(e));
        square.addEventListener("dragleave", (e) => this.dragLeave(e));
        square.addEventListener("drop", (e) => this.dragDrop(e));

        row.push({
          row: i,
          column: j,
          div: square,
          piece: this.setDefaultPieces(i, j, square),
        });

        // Set the default images of the pieces

        /**
         * Set the colors of the chess table.
         */

        main.appendChild(square);
      }
    }
    // Set the current state for movement of pieces
    this.board = matrix;
  }

  selectPiece(i, j) {
    if (!this.currentlySelectedPiece) {
      if (this.board[i][j].piece) {
        this.board.map((row) =>
          row.map((col) => (col.div.style.backgroundColor = ""))
        );
        this.board[i][j].div.style.backgroundColor = "#819669";

        this.currentlySelectedPiece = this.board[i][j];
      }
      this.getAvailablePositions(i, j);
    }
  }

  deselectPosition(i, j) {
    this.currentlySelectedPiece = undefined;
    this.board.map((row) =>
      row.map((col) => (col.div.style.backgroundColor = ""))
    );
  }

  getAvailablePositions(i, j) {
    if (this.board[i][j].piece.includes("rook")) {
      let spaceToRight = 7 - j;
      let spaceToLeft = 0 + j;
      let spaceToTop = 0 + i;
      let spaceToBottom = 7 - i;
      let moves = [];

      for (let y = 0; y <= spaceToRight; y++) {
        moves.push(this.board[i][j + y]);
        this.board[i][y + j].div.style.backgroundColor = "#85784E";
      }

      for (let y = 0; y < spaceToLeft; y++) {
        moves.push(this.board[i][y]);
        this.board[i][y].div.style.backgroundColor = "#85784E";
      }

      for (let y = 0; y < spaceToTop; y++) {
        moves.push(this.board[y][j]);
        this.board[y][j].div.style.backgroundColor = "#85784E";
      }
      for (let y = 0; y <= spaceToBottom; y++) {
        moves.push(this.board[y + i][j]);
        this.board[y + i][j].div.style.backgroundColor = "#85784E";
      }

      this.availableMovePositions = moves;
    } else if (this.board[i][j].piece.includes("pawn")) {
      if (i === 6 || i === 1) {
        if (i === 6) {
          this.board[i - 1][j].div.style.backgroundColor = "#85784E";
          this.board[i - 2][j].div.style.backgroundColor = "#85784E";
          this.availableMovePositions = [
            this.board[i - 1][j],
            this.board[i - 2][j],
          ];
          return [this.board[i - 1][j], this.board[i - 2][j]];
        }
        if (i === 1) {
          this.board[i + 1][j].div.style.backgroundColor = "#85784E";
          this.board[i + 2][j].div.style.backgroundColor = "#85784E";
          this.availableMovePositions = [
            this.board[i + 1][j],
            this.board[i + 2][j],
          ];

          return [this.board[i + 1][j], this.board[i + 2][j]];
        }
      } else {
        this.board[i - 1][j].div.style.backgroundColor = "#85784E";
        this.availableMovePositions = [this.board[i - 1][j]];
        return [this.board[i - 1][j]];
      }
    } else if (this.board[i][j].piece.includes("bishop")) {
      let spaceToRight = 7 - j;
      let spaceToLeft = 0 + j;
      let spaceToTop = 0 + i;
      let spaceToBottom = 7 - i;
      let moves = [];

      console.log({ spaceToBottom, spaceToTop, spaceToLeft, spaceToRight });

      let x = 0;

      while (x < spaceToTop && x < spaceToRight) {
        x++;
        moves.push(this.board[i - x][j + x]);
        this.board[i - x][j + x].div.style.backgroundColor = "#85784E";
      }

      let o = 0;
      while (o < spaceToBottom && o < spaceToRight) {
        o++;
        moves.push(this.board[i + o][j + o]);
        this.board[i + o][j + o].div.style.backgroundColor = "#85784E";
      }

      let m = 0;
      while (m < spaceToBottom && m < spaceToLeft) {
        m++;
        moves.push(this.board[i + m][j - m]);
        this.board[i + m][j - m].div.style.backgroundColor = "#85784E";
      }

      let n = 0;
      while (n < spaceToTop && n < spaceToLeft) {
        console.log({ n, i, j });
        n++;
        moves.push(this.board[i - n][j - n]);
        this.board[i - n][j - n].div.style.backgroundColor = "#85784E";
      }

      this.availableMovePositions = moves;
    } else {
      this.deselectPosition();
    }
  }

  getCoords(i, j) {
    return { row: i, column: j };
  }

  getBoard() {
    return this.board;
  }

  movePiece(e) {
    var elements = document.elementsFromPoint(e.clientX, e.clientY);
  }

  setDefaultPieces(row, col, square) {
    if (row === 0 && col === 0) {
      square.classList.add("black_rook");
      return "black_rook";
    } else if (row === 0 && col === 1) {
      square.classList.add("black_knight");
      return "black_knight";
    } else if (row === 0 && col === 2) {
      square.classList.add("black_bishop");
      return "black_bishop";
    } else if (row === 0 && col === 3) {
      square.classList.add("black_king");
      return "black_king";
    } else if (row === 0 && col === 4) {
      square.classList.add("black_queen");
      return "black_queen";
    } else if (row === 0 && col === 5) {
      square.classList.add("black_bishop");
      return "black_bishop";
    } else if (row === 0 && col === 6) {
      square.classList.add("black_knight");
      return "black_knight";
    } else if (row === 0 && col === 7) {
      square.classList.add("black_rook");
      return "black_rook";
    } else if (row === 1) {
      square.classList.add("black_pawn");
      return "black_pawn";
    } else if (row === 7 && col === 0) {
      square.classList.add("white_rook");
      return "white_rook";
    } else if (row === 7 && col === 1) {
      square.classList.add("white_knight");
      return "white_knight";
    } else if (row === 7 && col === 2) {
      square.classList.add("white_bishop");
      return "white_bishop";
    } else if (row === 7 && col === 3) {
      square.classList.add("white_king");
      return "white_king";
    } else if (row === 7 && col === 4) {
      square.classList.add("white_queen");
      return "white_queen";
    } else if (row === 7 && col === 5) {
      square.classList.add("white_bishop");
      return "white_bishop";
    } else if (row === 7 && col === 6) {
      square.classList.add("white_knight");
      return "white_knight";
    } else if (row === 7 && col === 7) {
      square.classList.add("white_rook");
      return "white_rook";
    } else if (row === 6) {
      square.classList.add("white_pawn");
      return "white_pawn";
    } else {
      return null;
    }
  }
}

class Piece {
  constructor(name, position, alive, color) {
    this.name;
    this.position;
    this.alive;
    this.color;
  }
}

const whiteKing = new Piece();
const whiteKnight_1 = new Piece();
const whiteKnight_2 = new Piece();
const whiteQueen = new Piece();
const whiteRook_1 = new Piece();
const whiteRook_2 = new Piece();
const whiteBishop_1 = new Piece();
const whiteBishop_2 = new Piece();
const whitePawn = new Piece();

const blackKing = new Piece();
const blackQueen = new Piece();
const blackKnight_1 = new Piece();
const blackKnight_2 = new Piece();
const blackRook1 = new Piece();
const blackRook2 = new Piece();
const blackBishop_1 = new Piece();
const blackBishop_2 = new Piece();
const blackPawn = new Piece();

class BoardPosition {}

let newBoard = new Chess();

newBoard.createChessTable();
newBoard.getCoords();
newBoard.getBoard();
