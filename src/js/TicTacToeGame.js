import GameBoard from './GameBoard.js';
import Player from './Player.js';
import UIManager from "./ui/UIManager.js";

export default class TicTacToeGame {
    constructor() {
        this.ui = new UIManager();
        this.board = new GameBoard();
        this.buttonList = document.querySelectorAll(".playgroundButton");
        this.boundHandleMove = this.handleMove.bind(this);

        this.initGame();
        this.bindEventListener();
    }

    initGame(pl1 = null, pl2 = null) {
        const sessionInfo = {
            player1: sessionStorage.getItem('player1'),
            player2: sessionStorage.getItem('player2')
        };

        if (sessionInfo.player1 && sessionInfo.player2 || pl1 && pl2) {
            this.player1 = new Player(1, sessionInfo.player1 || pl1, 'donut');
            this.player2 = new Player(10, sessionInfo.player2 || pl2, 'burger');

            if (pl1 && pl2) {
                sessionStorage.setItem('player1', pl1);
                sessionStorage.setItem('player2', pl2);
            }

            this.currentPlayer = this.player1;
            this.ui.updateTurn(this.currentPlayer.name);
            this.initButtons();
            this.ui.showGame();
        } else {
            this.ui.bindNewGame(this.initGame.bind(this));
        }
    }


    bindEventListener() {
        this.ui.bindRestartGame(this.startNewGame.bind(this));
        this.ui.bindResetGame(this.resetGame.bind(this));
    }

    handleMove(x, y, button) {
        if (this.board.isCellOccupied(x, y)) return;

        this.ui.markCell(button, this.currentPlayer.cssClass);
        this.board.updateCell(x, y, this.currentPlayer);

        const winnerId = this.board.checkWinner();
        if (winnerId) {
            this.showWinner(winnerId);
            this.disableButtons();
            return;
        }

        if (this.board.round > 4) {
            const oldestCell = this.board.removeOldest();
            const cssClassToRemove = oldestCell.playerId === 1 ? this.player1.cssClass : this.player2.cssClass;
            this.ui.unmarkCell(oldestCell.x, oldestCell.y, cssClassToRemove);
        }

        this.switchPlayer();
        this.ui.updateTurn(this.currentPlayer.name);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    showWinner(winnerId) {
        const winner = winnerId === 1 ? this.player1 : this.player2;
        const loser = winnerId === 1 ? this.player2 : this.player1;
        this.ui.showWinner(winner, loser)
    }

    disableButtons() {
        this.buttonList.forEach(btn => {
            btn.removeEventListener('click', this.boundHandleMove);
        });
    }

    initButtons() {
        this.ui.bindMoveHandler(this.boundHandleMove);
    }

    resetGame() {
        this.board.resetBoard();
        this.ui.resetBoardUI();
        this.currentPlayer = this.player1;
        this.ui.updateTurn(this.currentPlayer.name);
        this.initButtons();
    }

    startNewGame() {
        sessionStorage.removeItem('player1')
        sessionStorage.removeItem('player2')
        this.ui.startNewGame();
        this.initButtons();
    }
}
