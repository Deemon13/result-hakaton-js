import { BackgroundModule } from './background.module';

import { ShapeModule } from './shape.module';
import { ClicksModule } from './clicks.module';
import { Timer } from './timer.module';
import { RandomSound } from './randomSound.module';
import { Message } from './message.module';

export const clicksModule = new ClicksModule('click', 'Аналитика кликов');

export const shapeModule = new ShapeModule('shape', 'Случайная фигура');

export const timer = new Timer('timer', 'Таймер отсчета');

export const sound = new RandomSound('звук', 'Случайный звук');

export const backgroundModule = new BackgroundModule(
  'back',
  'Случайный фон',
  'body'
);

export const message = new Message('сообщение', 'Кастомное сообщение', 50);
