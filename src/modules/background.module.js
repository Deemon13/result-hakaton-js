import { Module } from '../core/module';

export class BackgroundModule extends Module {
  trigger() {
    console.log(`Run ${this.text}`);
  }
}

export class BackgroundModule2 extends Module {
  trigger() {
    console.log(`Run ${this.text}`);
  }
}

export class BackgroundModule3 extends Module {
  trigger() {
    console.log(`Run ${this.text}`);
  }
}
