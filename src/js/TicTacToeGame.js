import GameBoard from './GameBoard.js';
import Player from './Player.js';

export default class TicTacToeGame {
    constructor() {
        this.board = new GameBoard();
        this.player1 = new Player(1, sessionStorage.getItem('player1'), 'donut');
        this.player2 = new Player(10, sessionStorage.getItem('player2'), 'burger');
        this.currentPlayer = this.player1;

        this.buttonList = document.querySelectorAll(".playgroundButton");
        this.playerInfo = document.getElementById("playerInfo");
        this.winnerDisplay = document.getElementById('win');

        this.checkSessionStorage();
        this.updatePlayerInfo();
        this.initButtons();

        document.querySelector('.newGame').addEventListener('click', this.createNewGame);
        document.querySelector('.reset').addEventListener('click', () => this.resetGame());
    }

    checkSessionStorage() {
        if (!this.player1.name || !this.player2.name) {
            history.back();
        }
    }

    updatePlayerInfo() {
        this.playerInfo.innerHTML = `${this.currentPlayer.name} ist am Zug`;
    }

    handleMove(event) {
        const button = event.currentTarget;
        const x = parseInt(button.getAttribute("data-x"));
        const y = parseInt(button.getAttribute("data-y"));

        if (this.board.isCellOccupied(x, y)) return;

        this.board.updateCell(x, y, this.currentPlayer);

        const winnerId = this.board.checkWinner();
        if (winnerId) {
            this.showWinner(winnerId);
            this.disableButtons();
            return;
        }

        this.switchPlayer();
        this.updatePlayerInfo();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    showWinner(winnerId) {
        const winner = winnerId === 1 ? this.player1 : this.player2;
        this.winnerDisplay.style.display = "block";
        this.winnerDisplay.innerHTML = `${winner.name} hat gewonnen`;

        document.querySelectorAll(`.${winner.cssClass}`).forEach(el => el.classList.add('fall-out'));
    }

    disableButtons() {
        this.buttonList.forEach(btn => {
            btn.removeEventListener('click', this.boundHandleMove);
        });
    }

    initButtons() {
        this.boundHandleMove = this.handleMove.bind(this);
        this.buttonList.forEach(btn => {
            btn.addEventListener('click', this.boundHandleMove);
        });
    }

    resetGame() {
        this.board.resetBoard();
        this.buttonList.forEach(btn => {
            btn.classList.remove("donut", "burger", "fall-out");
        });
        this.currentPlayer = this.player1;
        this.updatePlayerInfo();
        this.winnerDisplay.style.display = "none";
        this.initButtons();
    }

    createNewGame() {
        window.location.href = window.location.origin + "/";
    }
}
