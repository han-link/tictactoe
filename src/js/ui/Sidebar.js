export default class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar.gameRules');
        this.closeBtn = this.sidebar.querySelector('button.close');
        this.openBtn = document.querySelector('.openSidebar');
    }

    bindHide(handler) {
        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hide();
            handler();
        })
    }

    bindShow(handler) {
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.show();
            handler();
        })
    }

    show() {
        this.sidebar.classList.add('show');
    }

    hide() {
        this.sidebar.classList.remove('show');
    }
}
