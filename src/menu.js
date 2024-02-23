import { Menu } from './core/menu';

import * as Modules from './modules/modules';

console.log(Modules);
// console.log(Object.keys(Modules));

// const backgroundModule = new BackgroundModule('back', 'Случайный фон');

export class ContextMenu extends Menu {
  #body;
  #menu;
  constructor() {
    super();
    this.#body = document.querySelector('body');
    this.#menu = this.#body.querySelector('.menu');
    this.modulesList = Object.keys(Modules);
    // this.list = [
    //   'Аналитика кликов',
    //   'Случайная фигура',
    //   'Таймер отсчета',
    //   'Случайный звук',
    //   'Случайный фон',
    //   'Кастомное сообщение',
    // ];
  }

  open() {
    // console.log(this.modulesList.backgroundModule.text);
    this.#body.addEventListener('contextmenu', event => {
      // отменяем действие по умолчанию - вызов встроенного контекстного меню
      event.preventDefault();
      // если меню уже вызвано - перезатираем содержимое
      if (this.#menu) {
        this.#menu.innerHTML = '';
      }
      //console.log('contextMenuOpen');
      // проверка экспортируемых модулей
      // console.log(backgroundModule.text);
      // console.log(backgroundModule.type);
      // создание списка пунктов - пока из существующего набора
      this.#menu.classList.add('open');
      this.modulesList.forEach(item => {
        //   this.list.forEach(item => {
        // console.log(Modules[item].text);
        this.#menu.insertAdjacentHTML('beforeend', Modules[item].toHTML());
        // const itemHTML = document.createElement('li');
        // itemHTML.className = 'menu-item';
        // itemHTML.innerText = item;
        // this.#menu.append(itemHTML);
      });
      // создаем последний пункт меню для добавления модуля
      const lastItem = document.createElement('li');
      lastItem.className = 'menu-item';
      lastItem.innerText = 'Добавить модуль';
      this.#menu.append(lastItem);
      // получаем координаты щелчка мыши
      const menuLeft = event.clientX;
      const menuTop = event.clientY;
      //   console.log('event.clientX:', menuLeft);
      //   console.log('event.clientY:', menuTop);
      // передвигаем меню к координатам щелчка мыши
      this.#menu.style.left = `${menuLeft}px`;
      this.#menu.style.top = `${menuTop}px`;
    });
  }

  close() {
    // console.log('this.#menu.classList:', this.#menu.classList);
    // console.log('this.#menu.classList:', this.#menu.classList.contains('open'));
    this.#body.addEventListener('click', event => {
      if (event.target === this.#menu) {
        return;
      } else if (event.target.parentNode === this.#menu) {
        this.#menu.innerHTML = '';
        this.#menu.classList.remove('open');
        this.#menu.removeAttribute('style');
        if (event.target.innerText !== 'Добавить модуль') {
          //   console.log('Запускаем модуль:', event.target.innerText);
          //   console.log(event);
          //   console.log(event.target);
          //   console.log(event.target.dataset.type);
          const typeID = event.target.dataset.type;
          //   console.log(typeID);

          this.modulesList.forEach(item => {
            if (Modules[item].type === typeID) {
              //   console.log('Modules[item].type', Modules[item].type);
              //   console.log(
              //     'event.target.dataset.type',
              //     event.target.dataset.type
              //   );
              Modules[item].trigger();
            }
            // Modules[item].trigger();
          });
        } else {
          this.add();
        }
      } else {
        //console.log('event.target:', event.target);
        this.#menu.innerHTML = '';
        this.#menu.classList.remove('open');
        this.#menu.removeAttribute('style');
      }
    });

    this.#body.addEventListener('keydown', event => {
      if (event.key !== 'Escape') {
        return;
      }
      //console.log(event);
      this.#menu.innerHTML = '';
      this.#menu.classList.remove('open');
      this.#menu.removeAttribute('style');
    });
  }

  add() {
    // this.close();
    console.log('Добавляем модуль');
  }
}
