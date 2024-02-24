import { Module } from '../core/module';

export class Timer extends Module {
  #body;
  #hours;
  #minutes;
  #seconds;

  constructor(type, text, hours = 1, minutes = 0, seconds = 0) {
    super(type, text);
    this.#body = document.querySelector('body');
    this.#hours = hours;
    this.#minutes = minutes;
    this.#seconds = seconds;
    this.handleSubmit = this.#handleSubmit.bind(this);
    this.started = false;
  }

  get hours() {
    return this.#hours;
  }

  set hours(newHour) {
    this.#hours = newHour;
  }

  get minutes() {
    return this.#minutes;
  }

  set minutes(newMinute) {
    this.#minutes = newMinute;
  }

  get seconds() {
    return this.#seconds;
  }

  set seconds(newSecond) {
    this.#seconds = newSecond;
  }

  trigger() {
    if (document.querySelector('#create-timer')) {
      document.querySelector('#create-timer').remove();
    }
    if (document.querySelector('#timer')) {
      document.querySelector('#timer').remove();
    }
    this.started = false;
    this.#createForm();
  }

  #createForm() {
    const form = document.createElement('form');
    form.setAttribute('autocomplete', 'off');
    form.setAttribute('name', 'create-timer');
    form.setAttribute('id', 'create-timer');
    form.className = 'form create-timer';

    const hoursContainer = document.createElement('div');
    hoursContainer.setAttribute('role', 'group');
    hoursContainer.setAttribute('aria-labelledby', 'input-hours');
    hoursContainer.className = 'form__group';

    const hoursLabel = document.createElement('label');
    hoursLabel.setAttribute('for', 'hours');
    hoursLabel.className = 'form__label';
    hoursLabel.innerText = 'Задать часы:';

    const hoursInput = document.createElement('input');
    hoursInput.setAttribute('id', 'hours');
    hoursInput.setAttribute('type', 'number');
    hoursInput.setAttribute('name', 'hours');
    hoursInput.setAttribute('min', '0');
    hoursInput.setAttribute('max', '23');
    hoursInput.setAttribute('value', `${this.hours}`);
    hoursInput.className = 'form__input';

    const minutesContainer = document.createElement('div');
    minutesContainer.setAttribute('role', 'group');
    minutesContainer.setAttribute('aria-labelledby', 'input-minutes');
    minutesContainer.className = 'form__group';

    const minutesLabel = document.createElement('label');
    minutesLabel.setAttribute('for', 'minutes');
    minutesLabel.className = 'form__label';
    minutesLabel.innerText = 'Задать минуты:';

    const minutesInput = document.createElement('input');
    minutesInput.setAttribute('id', 'minutes');
    minutesInput.setAttribute('type', 'number');
    minutesInput.setAttribute('name', 'minutes');
    minutesInput.setAttribute('min', '0');
    minutesInput.setAttribute('max', '59');
    minutesInput.setAttribute('value', `${this.minutes}`);
    minutesInput.className = 'form__input';

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
    secondsInput.setAttribute('value', `${this.seconds}`);
    secondsInput.className = 'form__input';

    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.className = 'btn form__submit';
    btnSubmit.innerText = 'Создать Таймер';
    btnSubmit.addEventListener('click', this.handleSubmit);

    hoursContainer.append(hoursLabel, hoursInput);
    minutesContainer.append(minutesLabel, minutesInput);
    secondsContainer.append(secondsLabel, secondsInput);

    form.append(hoursContainer, minutesContainer, secondsContainer, btnSubmit);

    this.#body.append(form);
  }

  #handleSubmit(event) {
    event.preventDefault();

    this.hours = Number(event.target.form.elements.hours.value);
    this.minutes = Number(event.target.form.elements.minutes.value);
    this.seconds = Number(event.target.form.elements.seconds.value);
    this.#createTimer();
    this.#timerStart();
  }

  #createTimer() {
    document.querySelector('#create-timer').remove();

    const timerContainer = document.createElement('div');
    const timerDelimiterHours = document.createElement('span');
    const timerDelimiterMinutes = document.createElement('span');
    const timerHours = document.createElement('span');
    const timerMinutes = document.createElement('span');
    const timerSeconds = document.createElement('span');

    timerContainer.className = 'timer__container';
    timerContainer.setAttribute('id', 'timer');

    timerDelimiterHours.className = 'timer__delimiter';
    timerDelimiterHours.innerText = ' : ';

    timerDelimiterMinutes.className = 'timer__delimiter';
    timerDelimiterMinutes.innerText = ' : ';

    timerHours.className = 'timer__hours';
    timerHours.innerText = this.hours < 10 ? '0' + this.hours : this.hours;

    timerMinutes.className = 'timer__minutes';
    timerMinutes.innerText =
      this.minutes < 10 ? '0' + this.minutes : this.minutes;

    timerSeconds.className = 'timer__seconds';
    timerSeconds.innerText =
      this.seconds < 10 ? '0' + this.seconds : this.seconds;

    timerContainer.append(
      timerHours,
      timerDelimiterHours,
      timerMinutes,
      timerDelimiterMinutes,
      timerSeconds
    );

    this.#body.append(timerContainer);
  }

  #timerStart() {
    if (this.started) {
      return;
    }
    const startTime = new Date().getTime();

    const stopDateInMS =
      startTime +
      this.hours * 3600000 +
      this.minutes * 60000 +
      this.seconds * 1000;

    const countDown = setInterval(function () {
      const now = new Date().getTime();
      const remain = stopDateInMS - now;
      let hours = Math.floor((remain / 1000 / 60 / 60) % 24);
      let minutes = Math.floor((remain / 1000 / 60) % 60);
      let seconds = Math.floor((remain / 1000) % 60);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      document.querySelector('.timer__hours').innerHTML = hours;
      document.querySelector('.timer__minutes').innerHTML = minutes;
      document.querySelector('.timer__seconds').innerHTML = seconds;

      if (remain <= 0) {
        clearInterval(countDown);
        document.querySelector('.timer__container').innerHTML = 'Время вышло!';
        setTimeout(() => {
          document.querySelector('#timer').remove();
        }, 1000);
      }
    }, 1000);
    this.started = true;
  }
}
