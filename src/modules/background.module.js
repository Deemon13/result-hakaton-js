import { Module } from '../core/module';
import { random } from '../utils';

function getRandomColor(str) {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += str[random(0, str.length - 1)];
  }

  return color;
}

export class BackgroundModule extends Module {
  #numbers;
  #element;
  constructor(type, text, element) {
    super(type, text);
    this.#element = document.querySelector(`${element}`);
    this.#numbers = '0123456789abcdef';
  }

  trigger() {
    this.#element.style.backgroundColor = getRandomColor(this.#numbers);
  }
}
