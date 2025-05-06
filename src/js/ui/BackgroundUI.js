export default class BackgroundUI {
    constructor() {
        this.backgroundItems = document.querySelectorAll(".background li");
        this.reversedAnimations = new WeakSet();
    }

    startAnimations() {
        this.backgroundItems.forEach(element => {
           const animations = element.getAnimations();

           animations.forEach(animation => {
              animation.play();
              animation.playbackRate = 1;
           });
        });
    }

    stopAnimations() {
        this.backgroundItems.forEach(element => {
            const animations = element.getAnimations();

            animations.forEach(animation => {
                if (!this.reversedAnimations.has(animation)) {
                    if (!animation.pending) {
                        animation.reverse();
                        animation.playbackRate = -20;
                        this.reversedAnimations.add(animation);
                    } else {
                        animation.pause();
                    }
                }
            });
        });
    }
}
