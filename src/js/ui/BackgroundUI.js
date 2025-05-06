export default class BackgroundUI {
    constructor() {
        this.backgroundItems = document.querySelectorAll(".background li");
    }

    showAnimations() {
        this.backgroundItems.forEach(el => {
            el.style.transition = 'opacity 1.5s ease';
            el.style.opacity = '1';
        });
    }


    hideAnimations() {
        this.backgroundItems.forEach(el => {
            el.style.transition = 'opacity 1.5s ease';
            el.style.opacity = '0';
        });
    }

}
