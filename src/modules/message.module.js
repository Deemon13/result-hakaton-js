import { Module } from '../core/module';

export class Message extends Module {
    constructor(type, text) {
      super(type, text);
    }

    trigger() {
      console.log("If you see me, I am working.")
      const divMessage = document.createElement('div');
      divMessage.innerHTML = `
        <p style="color:red; font-size: 40px; margin: 10px; border: solid black 3px;">Who said that you cannot do it?!</p>
      `;  
      document.body.append(divMessage);
      setTimeout(function(){
        divMessage.innerHTML = '';
        }, 5000);;
    }
  }