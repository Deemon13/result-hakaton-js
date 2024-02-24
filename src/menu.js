import { Menu } from './core/menu';

import * as Modules from './modules/modules';

export class ContextMenu extends Menu {
  #body;
  #menu;
  constructor() {
    super();
    this.#body = document.querySelector('body');
    this.#menu = this.#body.querySelector('.menu');
    this.modulesList = Object.keys(Modules) || [];
  }

  open() {
    this.#body.addEventListener('contextmenu', event => {
      // отменяем действие по умолчанию - вызов встроенного контекстного меню
      event.preventDefault();
      // если модулей нет, меню не вызывается
      if (!this.modulesList.length) {
        return;
      }
      // если меню уже вызвано - перезатираем содержимое
      if (this.#menu) {
        this.#menu.innerHTML = '';
      }
      // создание списка пунктов
      this.#menu.classList.add('open');
      this.modulesList.forEach(item => {
        this.#menu.insertAdjacentHTML('beforeend', Modules[item].toHTML());
      });
      // создаем последний пункт меню для добавления модуля
      const lastItem = document.createElement('li');
      lastItem.className = 'menu-item';
      lastItem.innerText = 'Добавить модуль';
      this.#menu.append(lastItem);
      // получаем координаты щелчка мыши
      const menuLeft = event.clientX;
      const menuTop = event.clientY;
      // передвигаем меню к координатам щелчка мыши
      this.#menu.style.left = `${menuLeft}px`;
      this.#menu.style.top = `${menuTop}px`;
    });
  }

  close() {
    this.#body.addEventListener('click', event => {
      if (event.target === this.#menu) {
        return;
      } else if (event.target.parentNode === this.#menu) {
        this.#menu.innerHTML = '';
        this.#menu.classList.remove('open');
        this.#menu.removeAttribute('style');
        if (event.target.innerText !== 'Добавить модуль') {
          const typeID = event.target.dataset.type;

          this.modulesList.forEach(item => {
            if (Modules[item].type === typeID) {
              Modules[item].trigger();
            }
          });
        } else {
          this.add();
        }
      } else {
        this.#menu.innerHTML = '';
        this.#menu.classList.remove('open');
        this.#menu.removeAttribute('style');
      }
    });

    this.#body.addEventListener('keydown', event => {
      if (event.key !== 'Escape') {
        return;
      }
      this.#menu.innerHTML = '';
      this.#menu.classList.remove('open');
      this.#menu.removeAttribute('style');
    });
  }

  add() {
    console.log('Добавляем модуль');
  }
}
