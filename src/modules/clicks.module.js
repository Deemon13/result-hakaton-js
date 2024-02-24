import { Module } from '../core/module';

export class ClicksModule extends Module {
  constructor(type, text, counterSingleClicks = 0, counterDoubleCLicks = 0) {
    super(type, text);
    this.body = document.querySelector('body');
    this.body.addEventListener('click', this.handleOneClick.bind(this));
    this.body.addEventListener('dblclick', this.handleDblClick.bind(this));
    this.counterSingleClicks = counterSingleClicks;
    this.counterDoubleCLicks = counterDoubleCLicks;
  }

  handleOneClick() {
    this.counterSingleClicks += 1;
  }

  handleDblClick() {
    this.counterDoubleCLicks += 1;
  }

  trigger() {
    this.timeForClick();
  }

  timeForClick() {
    let time = 5000;
    const timerID = setTimeout(() => {
      this.body.removeEventListener('click', this.handleOneClick);
      this.body.removeEventListener('dblclick', this.handleDblClick);

      console.log('Время вышло!');
      console.log('Одиночные клики', this.counterSingleClicks);
      console.log('Двойные клики', this.counterDoubleCLicks);
    }, time);
    if (time <= 0) {
      clearTimeout(timerID);
    }
  }
}
