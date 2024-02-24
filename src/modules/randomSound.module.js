import { Module } from '../core/module';
import sound1 from '../sounds/sound_1.wav';
import sound2 from '../sounds/sound_2.wav';
import sound3 from '../sounds/sound_3.wav';
import sound4 from '../sounds/sound_4.wav';
import sound5 from '../sounds/sound_5.wav';
import sound6 from '../sounds/sound_6.wav';

const soundsArray = [sound1, sound2, sound3, sound4, sound5, sound6];

const soundsArr = soundsArray.map(name => {
  const sound = new Audio(name);
  sound.load();
  return sound;
});

export class RandomSound extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    console.log('If you see me, I am working.');
    const soundId = Math.floor(Math.random() * soundsArr.length);
    const randomSound = soundsArr[soundId];
    randomSound.play();
  }
}
