'use strict'

const WHITE = "WHITE";
const BLACK = "BLACK"

// Declare Pieces
function Pawn(color, position) {
    this.color = color;
    this.position = position;
    this.possibleMoves = [];
    this.possibleCaptures = [];
    this.hasMoved = false;

    this.clearMoves = () => {
        this.possibleMoves = []
    }

    this.clearCaptures = () => {
        this.possibleCaptures = []
    }

    this.updatePosition = (board) => {
        this.position = (board.includes(this)) ? board.indexOf(this) : null;
    }

    this.calculateMoves = (board) => {
        
        // If square in front is blocked, no moves are available, else, that move is possible
        const squareInFront = (this.color === WHITE) ? this.position + 8 : this.position - 8;
        if (board[squareInFront]) {
            return
        }
        else {
            this.possibleMoves.push(squareInFront)
        }

        // If pawn has not moved and the square two squares forward is empty, add to possible moves
        const squareTwoInFront = (this.color === WHITE) ? this.position + 16 : this.position - 16;
        if (!this.hasMoved && !board[squareTwoInFront]) {
            this.possibleMoves.push(squareTwoInFront)
        }   
    }

    this.calculateCaptures = (board) => {
        // If square forward one left one is opposite colored piece, add to possible captures
        const squareDiagonalLeft = (this.color === WHITE) ? this.position + 7 : this.position - 9;
        if (board[squareDiagonalLeft] && board[squareDiagonalLeft].color !== this.color) {
            this.possibleCaptures.push(squareDiagonalLeft);
        }

        // If square forward one right one is opposite colored piece, add to possible captures
        const squareDiagonalRight = (this.color === WHITE) ? this.position + 9 : this.position - 7;
        if (board[squareDiagonalRight] && board[squareDiagonalRight].color !== this.color) {
            this.possibleCaptures.push(squareDiagonalRight);
        }

    }
}

function Bishop(color, position) {
    this.color = color;
    this.position = position;
    this.possibleMoves = [];
    this.possibleCaptures = [];

    this.clearMoves = () => {
        this.possibleMoves = []
    }

    this.clearCaptures = () => {
        this.possibleCaptures = []
    }

    this.updatePosition = (board) => {
        this.position = (board.includes(this)) ? board.indexOf(this) : null;
    }

    this.calculateMoves = (board) => {
        // Calculate diagonals in all four directions
        const directions = [ 7, 9, -7, -9];
        directions.forEach((direction) => {
            this.calculateDiagonal(board, direction)
        })
    }

    this.calculateDiagonal = (board, increment) => {
        let potentialMove = this.position + increment;

        // While potential move is on the board and is empty, add move
        while (this.checkIfValid(potentialMove, increment, board)) {
            this.possibleMoves.push(potentialMove);    
            potentialMove += increment;
        }
    }

    this.checkIfValid = (square, increment, board) => {
        // If checking left diagonal
        if (increment === 7 || increment === -9) {
            
            // If move is on board and hasn't looped around to the other side
            if (square < board.length && square > 0 && square % 8 < this.position % 8) {
                
                // If the square is empty, return true
                if (!board[square]) {
                    return true
                }
                
                // If there is a piece of opposite color on that square, add that piece to captures but return false
                if (board[square] && board[square].color !== this.color) {
                    this.possibleCaptures.push(square)
                    return false
                }

                // If there is a piece of same color on that square. return false
                if (board[square] && board[square].color === this.color) {
                    return false
                }
            }
            // Return false given that it's either not on the board or the square has looped around
            return false
        }
        // Given checking right diagonal
        else {
            
            // If move is on board and hasn't looped around to the other side
            if (square < board.length && square > 0 && square % 8 > this.position % 8) {

                // If the square is empty, return true
                if (!board[square]) {
                    return true
                }
                
                // If there is a piece of opposite color on that square, add that piece to captures but return false
                if (board[square] && board[square].color !== this.color) {
                    this.possibleCaptures.push(square)
                    return false
                }

                // If there is a piece of same color on that square. return false
                if (board[square] && board[square].color === this.color) {
                    return false
                }
            }
        }

    }

    this.calculateCaptures = (board) => {
        // Already implemented in this.calculateMoves (specifically this.checkIfValid) so 
        // pass
    }
}

function Rook(color, position) {
    this.color = color;
    this.position = position;
    this.possibleMoves = [];
    this.possibleCaptures = [];

    this.clearMoves = () => {
        this.possibleMoves = []
    }

    this.clearCaptures = () => {
        this.possibleCaptures = []
    }

    this.updatePosition = (board) => {
        this.position = (board.includes(this)) ? board.indexOf(this) : null;
    }

    this.calculateMoves = (board) => {
        // Calculate moves in all four directions
        const directions = [ 8, 1, -1, -8];
        directions.forEach((direction) => {
            this.calculateLateral(board, direction)
        })
    }

    this.calculateLateral = (board, increment) => {
        let potentialMove = this.position + increment;

        // While potential move is on the board and is empty, add move
        while (this.checkIfValid(potentialMove, increment, board)) {
            this.possibleMoves.push(potentialMove);    
            potentialMove += increment;
        }
    }

    this.checkIfValid = (square, increment, board) => {
        // If checking horizontal movement
        if (increment === 1 || increment === -1) {
            
            // If move is on board and hasn't looped down/up a row
            if (square < board.length && square > 0 && Math.floor(square/8) < Math.floor(this.position/8)) {
                
                // If the square is empty, return true
                if (!board[square]) {
                    return true
                }
                
                // If there is a piece of opposite color on that square, add that piece to captures but return false
                if (board[square] && board[square].color !== this.color) {
                    this.possibleCaptures.push(square)
                    return false
                }

                // If there is a piece of same color on that square. return false
                if (board[square] && board[square].color === this.color) {
                    return false
                }
            }
            // Return false given that it's either not on the board or the square has looped around
            return false
        }
        // Given checking vertical movement
        else {
            
            // If move is on board
            if (square < board.length && square > 0) {

                // If the square is empty, return true
                if (!board[square]) {
                    return true
                }
                
                // If there is a piece of opposite color on that square, add that piece to captures but return false
                if (board[square] && board[square].color !== this.color) {
                    this.possibleCaptures.push(square)
                    return false
                }

                // If there is a piece of same color on that square. return false
                if (board[square] && board[square].color === this.color) {
                    return false
                }
            }
        }
    }
    
    this.calculateCaptures = (board) => {
        // Already implemented in this.calculateMoves (specifically this.checkIfValid) so 
        // pass
    }
}

const fenStringKey = {

}

function createBoard(fenString="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
    
    // Parse FEN String by spaces
    const [position, toMove, castlingRights, enPassantSquare, fiftyMoveRuleCounter, fullMoves] = fenString.split(' ');
    
    // Make flat array of length 64 to represent board
    const board = Array(64);

    return board
}

const printBoard = (board) => {
    "Print the board in 8x8 format"
    // Get a list of the leftmost square of each rank from top to bottom
    const leftSide = [56, 48, 40, 32, 24, 16, 8, 0]
    let finalString = "";
    // Start at left square and build the string from left to right
    leftSide.forEach((startSquare) => {
        // Build the row
        for (let i = startSquare; i < startSquare + 8; i++)  {
            if (i = startSquare) {
                finalString += "\n| ";
            }
            if (!board[i]) {
                finalString += "__ | "
            } 
            else {
                let piece = board[i]

                // Print piece color
                if (piece.color === "WHITE") {
                    finalString += "W";
                }
                else {
                    finalString += "B";
                }

                // Print piece
                if (typeof piece === "Pawn") {
                    
                    finalString += "P";
                }
                else if (typeof piece === "Bishop") {
                    finalString += "B";
                }
                else if (typeof piece === "Rook") {
                    finalString += "R";
                }
                else if (typeof piece === "Knight") {
                    finalString += "N";
                }
                else if (typeof piece === "Queen") {
                    finalString += "Q";
                }
                else if (typeof piece === "King") {
                    finalString += "K"
                }
            } 
            finalString += " | "
        }
    })
    console.log(finalString)
}