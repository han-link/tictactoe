import GameUI from './GameUI.js';
import NewGameModal from './NewGameModal.js';
import BackgroundUI from './BackgroundUI.js';

export default class UIManager {
    #game;
    #background;
    #modal;
    constructor() {
        this.#game = new GameUI();
        this.#modal = new NewGameModal();
        this.#background = new BackgroundUI();
    }

    bindMoveHandler(handler) {
        this.#game.bindBoard(handler);
    }

    bindNewGame(handler) {
        this.#modal.bindNewGame(handler);
    }

    updateTurn(name) {
        this.#game.updateTurnDisplay(name);
    }

    markCell(x, y, cssClass) {
        this.#game.markCell(x, y, cssClass);
    }

    unmarkCell(x, y, cssClass) {
        this.#game.unmarkCell(x, y, cssClass);
    }

    showWinner(name, cssClass) {
        this.#game.showWinner(name, cssClass);
    }

    bindRestartGame(handler) {
        this.#game.bindStartNewGame(handler);
    }

    bindResetGame(handler) {
        this.#game.bindResetGame(handler);
    }

    resetBoardUI() {
        this.#game.resetVisuals();
    }

    startNewGame() {
        this.resetBoardUI();
        this.#game.hide();
        this.#modal.showModal();
        this.#background.startAnimations();
    }

    showGame() {
        this.#modal.hideModal();
        this.#background.stopAnimations();
        this.#game.show()
    }
}
