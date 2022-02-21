/** @format */

const main = document.querySelector("#main");

class Chess {
  constructor() {
    this.board = undefined;
    this.currentlySelectedPiece = undefined;
    this.availableMovePositions = [];
    this.leavingPosition = undefined;
    this.goingPosition = undefined;
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

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter() {}
  dragLeave() {}
  dragDrop(e) {
    if (!this.currentlySelectedPiece) {
      // In case there is no piece selected, deselect the position and return null
      this.deselectPosition();
      return;
    } else {
      const { row, column } = e.target.dataset;
      // get the position of the square where the piece was dropped.
      let incomingSquare = this.board[row][column];

      // if there is a piece in the selected to me moved to position
      if (incomingSquare.piece) {
        // if the future position contains a piece of the same color with the currently selected piece.
        if (
          this.currentlySelectedPiece.piece.includes(
            incomingSquare.piece.split("_")[0]
          )
        ) {
          return;
        }
      }
      // The previous position is the same with the future position. Return null and deselect the position.
      if (
        row == this.currentlySelectedPiece.row &&
        column == this.currentlySelectedPiece.column
      ) {
        this.deselectPosition;
        return;
      }

      // if there is a piece selected; if the move is available, move the piece to the position.
      if (
        this.currentlySelectedPiece &&
        this.checkIfMoveIsAvailable(this.availableMovePositions, {
          row,
          column,
        })
      ) {
        if (incomingSquare.piece !== null) {
          console.log("here");
          incomingSquare.div.classList.remove(incomingSquare.piece);
          incomingSquare.piece = null;
          console.log(incomingSquare);
        }
        incomingSquare.div.classList.add(this.currentlySelectedPiece.piece);
        incomingSquare.piece = this.currentlySelectedPiece.piece;
        this.currentlySelectedPiece.div.classList.remove(
          this.currentlySelectedPiece.piece
        );
        this.leavingPosition.piece = null;
      }
      this.deselectPosition();
    }
  }

  /**
   *
   * @param {*} availableMoves
   * @param {*} param1
   * @returns @isAvailable - boolean saying if the move is available.
   */
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

  /**
   * Select the piece for drop
   * @param {*} i
   * @param {*} j
   * @returns
   */
  selectPiece(i, j) {
    if (!this.currentlySelectedPiece) {
      if (this.board[i][j].piece) {
        this.board.map((row) =>
          row.map((col) => (col.div.style.backgroundColor = ""))
        );
        this.board[i][j].div.style.backgroundColor = "#819669";
        this.leavingPosition = this.board[i][j];
        this.currentlySelectedPiece = this.board[i][j];
        this.getAvailablePositions(i, j);
      }
    } else {
      return;
    }
  }

  /**
   * Deselects the position
   * @param {*} i
   * @param {*} j
   */
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

      let currentPieceColor = this.currentlySelectedPiece.piece.split("_")[0];

      for (let y = 1; y <= spaceToRight; y++) {
        moves.push(this.board[i][j + y]);
        this.board[i][y + j].div.style.backgroundColor = "#85784E";
        if (this.board[i][j + y].piece !== null) {
          if (this.board[i][j + y].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }

      for (let y = 1; y <= spaceToLeft; y++) {
        moves.push(this.board[i][j - y]);
        this.board[i][j - y].div.style.backgroundColor = "#85784E";
        if (this.board[i][j - y].piece !== null) {
          if (this.board[i][j - y].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }

      for (let y = 1; y <= spaceToTop; y++) {
        moves.push(this.board[i - y][j]);
        this.board[i - y][j].div.style.backgroundColor = "#85784E";
        if (this.board[i - y][j].piece !== null) {
          if (this.board[i - y][j].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }
      for (let y = 1; y <= spaceToBottom; y++) {
        moves.push(this.board[y + i][j]);
        this.board[y + i][j].div.style.backgroundColor = "#85784E";
        if (this.board[i + y][j].piece !== null) {
          if (this.board[i + y][j].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }

      this.availableMovePositions = moves;
    } else if (this.board[i][j].piece.includes("pawn")) {
      if (i === 6 || i === 1) {
        if (i === 6) {
          if (this.board[i - 1][j].piece === null) {
            this.board[i - 1][j].div.style.backgroundColor = "#85784E";
            this.board[i - 2][j].div.style.backgroundColor = "#85784E";
            this.availableMovePositions = [
              this.board[i - 1][j],
              this.board[i - 2][j],
            ];
            return [this.board[i - 1][j], this.board[i - 2][j]];
          }
        }
        if (i === 1) {
          if (this.board[i + 1][j].piece === null) {
            this.board[i + 1][j].div.style.backgroundColor = "#85784E";
            this.board[i + 2][j].div.style.backgroundColor = "#85784E";
            this.availableMovePositions = [
              this.board[i + 1][j],
              this.board[i + 2][j],
            ];

            return [this.board[i + 1][j], this.board[i + 2][j]];
          }
        }
      } else {
        if (this.board[i][j].piece.includes("black")) {
          if (this.board[i + 1][j].piece === null) {
            this.board[i + 1][j].div.style.backgroundColor = "#85784E";
            this.availableMovePositions = [this.board[i + 1][j]];
            return [this.board[i + 1][j]];
          }
        } else if (this.board[i][j].piece.includes("white")) {
          if (this.board[i - 1][j].piece === null) {
            this.board[i - 1][j].div.style.backgroundColor = "#85784E";
            this.availableMovePositions = [this.board[i - 1][j]];
            return [this.board[i - 1][j]];
          }
        }
      }
    } else if (this.board[i][j].piece.includes("bishop")) {
      let spaceToRight = 7 - j;
      let spaceToLeft = 0 + j;
      let spaceToTop = 0 + i;
      let spaceToBottom = 7 - i;
      let moves = [];
      let currentPieceColor = this.currentlySelectedPiece.piece.split("_")[0];

      let x = 0;

      while (x < spaceToTop && x < spaceToRight) {
        x++;
        moves.push(this.board[i - x][j + x]);
        this.board[i - x][j + x].div.style.backgroundColor = "#85784E";
        if (this.board[i - x][j + x].piece !== null) {
          if (this.board[i - x][j + x].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i - x][j + x].piece.includes(currentPieceColor)) {
            moves.push(this.board[i - x][j + x]);
            break;
          }
        }
      }

      let o = 0;
      while (o < spaceToBottom && o < spaceToRight) {
        o++;
        moves.push(this.board[i + o][j + o]);
        this.board[i + o][j + o].div.style.backgroundColor = "#85784E";
        if (this.board[i + o][j + o].piece !== null) {
          if (this.board[i + o][j + o].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i + o][j + o].piece.includes(currentPieceColor)) {
            moves.push(this.board[i + o][j + o]);
            break;
          }
        }
      }

      let m = 0;
      while (m < spaceToBottom && m < spaceToLeft) {
        m++;
        moves.push(this.board[i + m][j - m]);
        this.board[i + m][j - m].div.style.backgroundColor = "#85784E";
        if (this.board[i + m][j - m].piece !== null) {
          if (this.board[i + m][j - m].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i + m][j - m].piece.includes(currentPieceColor)) {
            moves.push(this.board[i + m][j - m]);
            break;
          }
        }
      }

      let n = 0;
      while (n < spaceToTop && n < spaceToLeft) {
        n++;
        moves.push(this.board[i - n][j - n]);
        this.board[i - n][j - n].div.style.backgroundColor = "#85784E";
        if (this.board[i - n][j - n].piece !== null) {
          if (this.board[i - n][j - n].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i - n][j - n].piece.includes(currentPieceColor)) {
            moves.push(this.board[i - n][j - n]);
            break;
          }
        }
      }

      this.availableMovePositions = moves;
    } else if (this.board[i][j].piece.includes("king")) {
      let moves = [];
      for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, 7); x++) {
        for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, 7); y++) {
          if (x !== i || y !== j) {
            moves.push(this.board[x][y]);
            this.board[x][y].div.style.backgroundColor = "#85784E";
          }
        }
      }

      this.availableMovePositions = moves;
    } else if (this.board[i][j].piece.includes("queen")) {
      let spaceToRight = 7 - j;
      let spaceToLeft = 0 + j;
      let spaceToTop = 0 + i;
      let spaceToBottom = 7 - i;
      let moves = [];

      let currentPieceColor = this.currentlySelectedPiece.piece.split("_")[0];

      for (let y = 1; y <= spaceToRight; y++) {
        moves.push(this.board[i][j + y]);
        this.board[i][y + j].div.style.backgroundColor = "#85784E";
        if (this.board[i][j + y].piece !== null) {
          if (this.board[i][j + y].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }

      for (let y = 1; y <= spaceToLeft; y++) {
        moves.push(this.board[i][y]);
        this.board[i][j - y].div.style.backgroundColor = "#85784E";
        if (this.board[i][j - y].piece !== null) {
          if (this.board[i][j - y].piece.includes(currentPieceColor)) {
            console.log(this.board[i][j - y]);
            break;
          } else {
            break;
          }
        }
      }

      for (let y = 1; y <= spaceToTop; y++) {
        moves.push(this.board[y][j]);
        this.board[i - y][j].div.style.backgroundColor = "#85784E";
        if (this.board[i - y][j].piece !== null) {
          if (this.board[i - y][j].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }
      for (let y = 1; y <= spaceToBottom; y++) {
        moves.push(this.board[y + i][j]);
        this.board[y + i][j].div.style.backgroundColor = "#85784E";
        if (this.board[y + i][j].piece !== null) {
          if (this.board[y + i][j].piece.includes(currentPieceColor)) {
            break;
          } else {
            break;
          }
        }
      }

      let x = 0;

      while (x < spaceToTop && x < spaceToRight) {
        x++;
        moves.push(this.board[i - x][j + x]);
        this.board[i - x][j + x].div.style.backgroundColor = "#85784E";
        if (this.board[i - x][j + x].piece !== null) {
          if (this.board[i - x][j + x].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i - x][j + x].piece.includes(currentPieceColor)) {
            moves.push(this.board[i - x][j + x]);
            break;
          }
        }
      }

      let o = 0;
      while (o < spaceToBottom && o < spaceToRight) {
        o++;
        moves.push(this.board[i + o][j + o]);
        this.board[i + o][j + o].div.style.backgroundColor = "#85784E";
        if (this.board[i + o][j + o].piece !== null) {
          if (this.board[i + o][j + o].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i + o][j + o].piece.includes(currentPieceColor)) {
            moves.push(this.board[i - o][j + o]);
            break;
          }
        }
      }

      let m = 0;
      while (m < spaceToBottom && m < spaceToLeft) {
        m++;
        moves.push(this.board[i + m][j - m]);
        this.board[i + m][j - m].div.style.backgroundColor = "#85784E";
        if (this.board[i + m][j - m].piece !== null) {
          if (this.board[i + m][j - m].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i + m][j - m].piece.includes(currentPieceColor)) {
            moves.push(this.board[i + m][j + m]);
            break;
          }
        }
      }

      let n = 0;
      while (n < spaceToTop && n < spaceToLeft) {
        n++;
        moves.push(this.board[i - n][j - n]);
        this.board[i - n][j - n].div.style.backgroundColor = "#85784E";
        if (this.board[i - n][j - n].piece !== null) {
          if (this.board[i - n][j - n].piece.includes(currentPieceColor)) {
            break;
          }
          if (!this.board[i - n][j - n].piece.includes(currentPieceColor)) {
            moves.push(this.board[i - n][j - n]);
            break;
          }
        }
      }

      this.availableMovePositions = moves;
    } else if (this.board[i][j].piece.includes("knight")) {
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
        if (this.board[i + m.x] && this.board[i + m.x][j + m.y]) {
          moves.push(this.board[i + m.x][j + m.y]);
          this.board[i + m.x][j + m.y].div.style.backgroundColor = "#85784E";
        }
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

let newBoard = new Chess();

newBoard.createChessTable();
newBoard.getCoords();
newBoard.getBoard();
