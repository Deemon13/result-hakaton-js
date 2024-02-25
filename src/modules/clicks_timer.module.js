import { Module } from '../core/module';

export class ClicksTimerModule extends Module {
  constructor(type, text, counterSingleClicks = 0, counterDoubleCLicks = 0) {
    super(type, text);
    this.body = document.querySelector('body');
    this.body.addEventListener('click', this.handleOneClick.bind(this));
    this.body.addEventListener('dblclick', this.handleDblClick.bind(this));
    this.body.addEventListener('mousedown', event => {
      event.preventDefault();
    });
    this.counterSingleClicks = counterSingleClicks;
    this.counterDoubleCLicks = counterDoubleCLicks;
    this.time = null;
    this.countDownId = null;
  }

  handleOneClick() {
    this.counterSingleClicks += 1;
  }

  handleDblClick() {
    this.counterDoubleCLicks += 1;
  }

  trigger() {
    this.enterTheTime();
    this.timeForClick();
  }

  timeForClick() {
    let time = this.time;
    this.counterSingleClicks = 0;
    this.counterDoubleCLicks = 0;
    const timerID = setTimeout(() => {
      this.body.removeEventListener('click', this.handleOneClick);
      this.body.removeEventListener('dblclick', this.handleDblClick);

      this.renderResult(this.counterSingleClicks, this.counterDoubleCLicks);
    }, time);
    if (time <= 0) {
      clearTimeout(timerID);
    }
  }

  enterTheTime() {
    this.time = Number(prompt('Введите время в секундах...')) * 1000;
    this.createTimer(this.time);
  }

  createTimer(seconds) {
    const timerWrapper = document.createElement('div');
    timerWrapper.className = 'timer__wrapper';
    const timer = document.createElement('span');
    timer.className = 'timer';

    timer.innerText =
      seconds / 1000 < 10
        ? '0' + seconds / 1000 + ' секунд'
        : seconds / 1000 + ' секунд';

    timerWrapper.append(timer);
    this.body.append(timerWrapper);
    this.startTimer();
  }

  startTimer() {
    const startTime = new Date().getTime();

    const stopDateInMS = startTime + this.time;

    const countDown = setInterval(function () {
      this.countDownId = countDown;
      const now = new Date().getTime();
      const remain = stopDateInMS - now;

      let seconds = Math.floor((remain / 1000) % 60);

      seconds = seconds < 10 ? '0' + seconds + ' секунд' : seconds + ' секунд';

      if (document.querySelector('.timer')) {
        document.querySelector('.timer').innerHTML = seconds;
      } else {
        clearInterval(this.countDownId);
      }

      if (remain <= 0) {
        clearInterval(this.countDownId);
        document.querySelector('.timer').innerHTML = 'Время вышло!';
        // setTimeout(() => {
        //   document.querySelector('.timer__wrapper').remove();
        // }, 1000);
      }
    }, 1000);
  }

  renderResult(clicks, doubleClicks) {
    const resultWrapper = document.createElement('div');
    const clicksSpan = document.createElement('span');
    const dblClicksSpan = document.createElement('span');
    clicksSpan.innerText = `Число одиночных кликов: ${clicks}`;
    dblClicksSpan.innerText = `Число двойных кликов: ${doubleClicks}`;

    resultWrapper.append(clicksSpan, dblClicksSpan);
    this.body.append(resultWrapper);
  }
}
