export default class GameUI {
    constructor() {
        this.playerInfo = document.getElementById("playerInfo");
        this.winDisplay = document.getElementById("win");
        this.buttons = document.querySelectorAll(".playgroundButton");
        this.playground = document.querySelector(".game");
        this.newGameBtn = document.querySelector('.newGame');
        this.resetBtn = document.querySelector('.reset');
    }

    bindBoard(handler) {
        this.buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const x = +btn.getAttribute("data-x");
                const y = +btn.getAttribute("data-y");
                handler(x, y, btn);
            });
        });
    }

    bindResetGame(handler) {
        this.resetBtn.addEventListener("click", handler)
    }

    bindStartNewGame(handler) {
        this.newGameBtn.addEventListener("click", handler)
    }

    updateTurnDisplay(name) {
        this.playerInfo.textContent = `${name} ist am Zug`;
    }

    markCell(btn, cssClass) {
        btn.classList.add(cssClass);
    }

    unmarkCell(x, y, cssClass) {
        const btn = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
        if (btn) btn.classList.remove(cssClass);
    }

    showWinner(winner, loser) {
        this.winDisplay.style.display = "block";
        this.winDisplay.textContent = `${winner.name} hat gewonnen`;
        document.querySelectorAll(`.${loser.cssClass}`).forEach(el => el.classList.add("fall-out"));
    }

    resetVisuals() {
        this.buttons.forEach(btn => {
            btn.classList.remove("donut", "burger", "fall-out");
        });
        this.winDisplay.style.display = "none";
    }

    show() {
        this.playground.style.display = "block";
    }

    hide() {
        this.playground.style.display = "none";
    }
}
