import { Module } from '../core/module';
import { random } from '../utils';
import { getRandomColor } from '../utils';

export class ShapeModule extends Module {
  #numbers;
  #body;
  #shapeHTML;
  constructor(type, text) {
    super(type, text);
    this.#numbers = '0123456789abcdef';
    this.#body = document.querySelector('body');
    this.#shapeHTML = document.createElement('div');
    this.#shapeHTML.className = 'shape';
  }

  getRandomPosition(shape) {
    let randomY = Math.floor(random(0, 1400));
    let randomX = Math.floor(random(0, 800));
    shape.style.transform = `translate(${randomY}px, ${randomX}px)`;
  }

  drawRandomShape() {
    const randomNumber = random(1, 4);

    if (randomNumber === 1) {
      const sizeSquare = `${random(100, 200)}px`;
      this.#shapeHTML.style.width = sizeSquare;
      this.#shapeHTML.style.height = sizeSquare;
      this.#shapeHTML.style.backgroundColor = getRandomColor(this.#numbers);
      this.getRandomPosition(this.#shapeHTML);
      this.#body.append(this.#shapeHTML);
    } else if (randomNumber === 2) {
      const sizeCircle = `${random(100, 200)}px`;
      this.#shapeHTML.style.width = sizeCircle;
      this.#shapeHTML.style.height = sizeCircle;
      this.#shapeHTML.style.backgroundColor = getRandomColor(this.#numbers);
      this.#shapeHTML.style.borderRadius = '50%';
      this.getRandomPosition(this.#shapeHTML);
      this.#body.append(this.#shapeHTML);
    } else if (randomNumber === 3) {
      this.#shapeHTML.style.width = '0px';
      this.#shapeHTML.style.height = '0px';
      this.#shapeHTML.style.borderLeft = '50px solid transparent';
      this.#shapeHTML.style.borderRight = '50px solid transparent';
      this.#shapeHTML.style.borderBottom = `${random(
        100,
        200
      )}px solid ${getRandomColor(this.#numbers)}`;
      this.getRandomPosition(this.#shapeHTML);
      this.#body.append(this.#shapeHTML);
    } else if (randomNumber === 4) {
      this.#shapeHTML.style.width = `${random(200, 300)}px`;
      this.#shapeHTML.style.height = `${random(100, 200)}px`;
      this.#shapeHTML.style.backgroundColor = getRandomColor(this.#numbers);
      this.getRandomPosition(this.#shapeHTML);
      this.#body.append(this.#shapeHTML);
    }
  }

  trigger() {
    if (this.#shapeHTML) {
      this.#shapeHTML.removeAttribute('style');
      this.#shapeHTML.remove(this.#body);
    }
    this.drawRandomShape();
  }
}
