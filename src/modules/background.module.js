import { Module } from '../core/module';
import { getRandomColor } from '../utils';

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
