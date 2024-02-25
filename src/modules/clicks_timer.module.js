import { Module } from '../core/module';

export class ClicksTimerModule extends Module {
  #time;
  constructor(
    type,
    text,
    counterSingleClicks = 0,
    counterDoubleCLicks = 0,
    time = 6000
  ) {
    super(type, text);
    this.body = document.querySelector('body');
    this.body.addEventListener('click', this.handleOneClick.bind(this));
    this.body.addEventListener('dblclick', this.handleDblClick.bind(this));
    this.body.addEventListener('mousedown', event => {
      event.preventDefault();
    });
    this.counterSingleClicks = counterSingleClicks;
    this.counterDoubleCLicks = counterDoubleCLicks;
    this.#time = time;
    this.countDownId = null;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get time() {
    return this.#time;
  }

  set time(newTime) {
    this.#time = newTime;
  }

  handleOneClick() {
    this.counterSingleClicks += 1;
  }

  handleDblClick() {
    this.counterDoubleCLicks += 1;
  }

  trigger() {
    this.enterTheTime();
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
    const form = document.createElement('form');
    form.setAttribute('autocomplete', 'off');
    form.setAttribute('name', 'create-timer');
    form.setAttribute('id', 'create-timer');
    form.className = 'form create-timer';

    const secondsContainer = document.createElement('div');
    secondsContainer.setAttribute('role', 'group');
    secondsContainer.setAttribute('aria-labelledby', 'input-seconds');
    secondsContainer.className = 'form__group';

    const secondsLabel = document.createElement('label');
    secondsLabel.setAttribute('for', 'seconds');
    secondsLabel.className = 'form__label';
    secondsLabel.innerText = 'Задать секунды:';

    const secondsInput = document.createElement('input');
    secondsInput.setAttribute('id', 'seconds');
    secondsInput.setAttribute('type', 'number');
    secondsInput.setAttribute('name', 'seconds');
    secondsInput.setAttribute('min', '0');
    secondsInput.setAttribute('max', '59');
    secondsInput.setAttribute('value', `${this.time / 1000}`);
    secondsInput.className = 'form__input';

    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.className = 'btn form__submit';
    btnSubmit.innerText = 'Запустить Таймер';
    btnSubmit.addEventListener('click', this.handleSubmit);

    secondsContainer.append(secondsLabel, secondsInput);

    form.append(secondsContainer, btnSubmit);

    this.body.append(form);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.time = Number(event.target.form.elements.seconds.value) * 1000;
    this.createTimer(this.time);
    this.startTimer();
    this.timeForClick();
  }

  createTimer(seconds) {
    document.querySelector('#create-timer').remove();

    const timerWrapper = document.createElement('div');
    timerWrapper.className = 'timer__wrapper';
    timerWrapper.innerText = 'Время кликать!';
    const timer = document.createElement('span');
    timer.className = 'timer';

    timer.innerText =
      seconds / 1000 < 10
        ? '0' + seconds / 1000 + ' секунд'
        : seconds / 1000 + ' секунд';

    timerWrapper.append(timer);
    this.body.append(timerWrapper);
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
        document.querySelector('.timer__wrapper').innerHTML = 'Время вышло!';
      }
    }, 1000);
  }

  renderResult(clicks, doubleClicks) {
    const resultWrapper = document.createElement('div');
    resultWrapper.className = 'result__wrapper';
    const clicksSpan = document.createElement('span');
    const dblClicksSpan = document.createElement('span');
    clicksSpan.innerText = `Число одиночных кликов: ${clicks}`;
    dblClicksSpan.innerText = `Число двойных кликов: ${doubleClicks}`;

    resultWrapper.append(clicksSpan, dblClicksSpan);
    this.body.append(resultWrapper);
  }
}
