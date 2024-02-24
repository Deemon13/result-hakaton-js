import {
  BackgroundModule,
  //   BackgroundModule2,
  //   BackgroundModule3,
} from './background.module';

import { ShapeModule } from './shape.module';
import { ClicksModule } from './clicks.module';
import { Timer } from './timer.module';

/*
здесь добавить импорты экземпляров классов Таймер отсчета, Случайный звук, Кастомное сообщение
*/

export const clicksModule = new ClicksModule('click', 'Аналитика кликов');

export const shapeModule = new ShapeModule('shape', 'Случайная фигура');

/**/
export const timer = new Timer('timer', 'Таймер отсчета');
/**/

/*
 здесь вставить export для экземпляра класса Случайный звук
*/
export const sound = new RandomSound ('звук', 'Случайный звук');

export const backgroundModule = new BackgroundModule(
  'back',
  'Случайный фон',
  'body'
);
// export const backgroundModule2 = new BackgroundModule2(
//   'back2',
//   'Случайный фон2'
// );
// export const backgroundModule3 = new BackgroundModule3(
//   'back3',
//   'Случайный фон3'
// );

/*
 здесь вставить export для экземпляра класса Кастомное сообщение
*/
