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

  clickTimer() {
    const clickContainer = document.createElement('div');
    clickContainer.className = 'click__container';

    const buttonToStart = document.createElement('button');
    buttonToStart.className = 'click__button';
    buttonToStart.textContent = 'Tap to start';

    const counterSingleHTML = document.createElement('div');
    counterSingleHTML.className = 'click__single-counter';
    const counterDoubleHTML = document.createElement('div');
    counterDoubleHTML.className = 'click__double-counter';

    this.counterSingleClicks = 0;
    this.counterDoubleCLicks = 0;

    clickContainer.append(buttonToStart);
    this.body.append(clickContainer);

    buttonToStart.addEventListener('click', (event) => {
      const {target} = event;

      if(target) {
        counterSingleHTML.removeAttribute('style');
        counterDoubleHTML.removeAttribute('style');
        counterSingleHTML.remove();
        counterDoubleHTML.remove();
      }

      this.counterSingleClicks = 0;
      this.counterDoubleCLicks = 0;
      let time = 5000;
      const timerID = setTimeout(() => {
        this.body.removeEventListener('click', this.handleOneClick);

        counterSingleHTML.textContent = `Single Clicks: ${this.counterSingleClicks -1}`;
        counterDoubleHTML.textContent = `Double Clicks: ${this.counterDoubleCLicks}`;

        clickContainer.append(counterSingleHTML, counterDoubleHTML);
      }, time);
      if (time <= 0) {
        clearTimeout(timerID);
      }
    })
  }

  handleOneClick() {
    this.counterSingleClicks += 1;
  }

  handleDblClick() {
    this.counterDoubleCLicks += 1;
  }

  trigger() {
    this.clickTimer();
  }
}
