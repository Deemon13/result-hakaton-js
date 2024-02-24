import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.body = document.querySelector('body');
        this.counterSingleClicks = 0;
        this.counterDoubleCLicks = 0;
    }

    timerForClick() {
        this.body.addEventListener('click', () => {
            this.counterSingleClicks++;
            let time = 2000;
            let timerId = setTimeout(() => {
                clearTimeout(timerId);
                console.log(timerId);
                alert(`Количество кликов за 2 секунды: ${this.counterSingleClicks}`);
            }, time);
        });
    }

    trigger() {
        this.timerForClick();
    }
}