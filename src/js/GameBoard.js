export default class GameBoard {
    constructor() {
        this.resetBoard();
    }

    resetBoard() {
        this.board = Array(3).fill(null).map(() => Array(3).fill(null)); // [y][x]
        this.round = 0;
        this.timeLine = [];
    }

    updateCell(x, y, player) {
        this.round++;
        this.board[y][x] = player.id;
        this.timeLine.push({ x, y, playerId: player.id });
    }

    removeOldest() {
        const oldestField = this.timeLine.shift();
        this.board[oldestField.y][oldestField.x] = null;
        return oldestField;
    }

    isCellOccupied(x, y) {
        return this.board[y][x] !== null;
    }

    checkWinner() {
        const lines = [];

        // Rows & Columns
        for (let i = 0; i < 3; i++) {
            lines.push(this.board[i]); // Row (y fixed)
            lines.push(this.board.map(row => row[i])); // Column (x fixed)
        }

        // Diagonals
        lines.push([0, 1, 2].map(i => this.board[i][i]));
        lines.push([0, 1, 2].map(i => this.board[i][2 - i]));

        for (const line of lines) {
            if (line.every(cell => cell !== null)) {
                const sum = line.reduce((a, b) => a + b, 0);
                if (sum === 3) return 1;
                if (sum === 30) return 10;
            }
        }

        return null;
    }
}
