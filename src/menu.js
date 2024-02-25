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
      this.#reset();

      event.preventDefault();

      if (!this.modulesList.length) {
        return;
      }

      if (this.#menu) {
        this.#menu.innerHTML = '';
      }

      this.#menu.classList.add('open');
      this.modulesList.forEach(item => {
        this.#menu.insertAdjacentHTML('beforeend', Modules[item].toHTML());
      });

      const lastItem = document.createElement('li');
      lastItem.className = 'menu-item';
      lastItem.innerText = 'Добавить модуль';
      this.#menu.append(lastItem);

      const menuLeft = event.clientX;
      const menuTop = event.clientY;
      const menuWidth = this.#menu.clientWidth;
      const menuHeight = this.#menu.clientHeight;
      const docWidth = document.defaultView.innerWidth;
      const docHeight = document.defaultView.innerHeight;

      this.#menu.style.left =
        menuLeft + menuWidth >= docWidth
          ? `${docWidth - menuWidth}px`
          : `${menuLeft}px`;
      this.#menu.style.top =
        menuTop + menuHeight >= docHeight
          ? `${docHeight - menuHeight}px`
          : `${menuTop}px`;
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
          this.#reset();
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

  #reset() {
    this.#body = document.querySelector('body');
    this.#body.innerHTML = '<ul class="menu" id="menu"></ul>';
    this.#menu = this.#body.querySelector('.menu');
  }
}
