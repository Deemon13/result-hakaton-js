import { Module } from '../core/module';

export class Timer extends Module {
  #body;

  constructor(type, text) {
    super(type, text);
    this.#body = document.querySelector('body');
  }

  trigger() {
    console.log(`Run ${this.text}`);
    const form = this.#createForm();
  }

  #createForm() {
    const form = document.createElement('form');
    form.setAttribute('autocomplete', 'off');
    form.setAttribute('name', 'create-timer');
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
    hoursInput.setAttribute('value', '00');
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
    minutesInput.setAttribute('value', '00');
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
    secondsInput.setAttribute('value', '00');
    secondsInput.className = 'form__input';

    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.className = 'btn form__submit';
    btnSubmit.innerText = 'Создать Таймер';

    hoursContainer.append(hoursLabel, hoursInput);
    minutesContainer.append(minutesLabel, minutesInput);
    secondsContainer.append(secondsLabel, secondsInput);

    form.append(hoursContainer, minutesContainer, secondsContainer, btnSubmit);

    this.#body.append(form);
  }
}
