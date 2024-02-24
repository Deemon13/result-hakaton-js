import { Module } from '../core/module';

export class Timer extends Module {
  #body;
  #hours;
  #minutes;
  #seconds;

  constructor(type, text, hours = 7, minutes = 13, seconds = 42) {
    super(type, text);
    this.#body = document.querySelector('body');
    this.#hours = hours;
    this.#minutes = minutes;
    this.#seconds = seconds;
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
    console.log(`Run ${this.text}`);
    if (document.querySelector('#create-timer')) {
      document.querySelector('#create-timer').remove();
    }
    this.#createForm();
    this.#createTimer('Создаем таймер... trigger');
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
    btnSubmit.addEventListener('click', this.#handleSubmit);

    hoursContainer.append(hoursLabel, hoursInput);
    minutesContainer.append(minutesLabel, minutesInput);
    secondsContainer.append(secondsLabel, secondsInput);

    form.append(hoursContainer, minutesContainer, secondsContainer, btnSubmit);

    this.#body.append(form);
  }

  #handleSubmit(event) {
    event.preventDefault();
    console.log('btnSumit click');
    // console.log(event);
    // console.log(event.target);

    // console.log(event.target.form.elements.hours);
    // console.log(event.target.form.elements.minutes);
    // console.log(event.target.form.elements.seconds);

    this.hours = Number(event.target.form.elements.hours.value);
    this.minutes = Number(event.target.form.elements.minutes.value);
    this.seconds = Number(event.target.form.elements.seconds.value);

    console.log('hours', this.hours);
    console.log('minutes', this.minutes);
    console.log('seconds', this.seconds);
    // const timer = this.#createTimer();
    // console.log(this);
    // console.log('Создаем таймер...');
  }

  #createTimer(message) {
    console.log(message);
  }
}
