export default class NewGameModal {
    constructor() {
        this.modal = document.querySelector('.container.newGameModal');
        this.form = this.modal.querySelector('form#createGameForm');
    }

    bindNewGame(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const player1 = formData.get('player1').toString();
            const player2 = formData.get('player2').toString();

            if (player1.trim() !== "" && player2.trim() !== "") {
                handler(player1, player2);
            }
        });
    }

    showModal() {
        this.modal.style.display = "block";
    }

    hideModal() {
        this.modal.style.display = "none";
    }
}
