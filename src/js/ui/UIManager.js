import GameUI from './GameUI.js';
import NewGameModal from './NewGameModal.js';
import BackgroundUI from './BackgroundUI.js';
import Sidebar from "./Sidebar.js";

export default class UIManager {
    #game;
    #background;
    #modal;
    #sidebar
    #main;
    #nav;
    constructor() {
        this.#game = new GameUI();
        this.#modal = new NewGameModal();
        this.#background = new BackgroundUI();
        this.#sidebar = new Sidebar();
        this.#main = document.querySelector('main');
        this.#nav = document.querySelector('nav');
        this.bindUiEvents();
    }

    #blur() {
        this.#main.classList.add('blur');
        this.#nav.classList.add('blur');
    }

    #removeBlur() {
        this.#main.classList.remove('blur');
        this.#nav.classList.remove('blur');
    }

    bindUiEvents() {
        this.#sidebar.bindShow(this.#blur.bind(this));
        this.#sidebar.bindHide(this.#removeBlur.bind(this));
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
        this.#background.showAnimations();
    }

    showGame() {
        this.#modal.hideModal();
        this.#background.hideAnimations();
        this.#game.show()
    }
}
