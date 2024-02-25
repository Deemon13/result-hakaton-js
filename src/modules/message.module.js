import { Module } from '../core/module';
import { random } from '../utils';

export class Message extends Module {
  #message;
  #numberOfChars;
  constructor(type, text, numberOfChars = 35) {
    super(type, text);
    this.#numberOfChars = numberOfChars;
    this.#message =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perspiciatis itaque nobis pariatur culpa laborum dolorum illum temporibus eius deserunt officiis dicta deleniti maxime nam repellat, saepe odio ullam dolore quis soluta autem iure laboriosam assumenda quia! Officia dolorum ipsam corporis iste illo voluptates laborum eos omnis, corrupti, repellat fugit expedita voluptate ea porro obcaecati cum aliquid atque, est placeat? Id totam fugit ratione earum asperiores aspernatur, blanditiis quia laboriosam officia adipisci vitae inventore deserunt voluptates labore culpa deleniti repellendus quasi nisi nihil explicabo iure. Doloremque voluptate ex mollitia et nobis, deleniti minima recusandae in rerum. Ut nihil impedit dolor molestiae architecto in magnam dignissimos sed, aspernatur, iure inventore nisi harum! Eaque aut ducimus dolor iusto, dolore quas! Et laudantium nulla eos at dolore tempore, amet iusto minima veniam consequuntur quo, rem sapiente saepe repellat. Ab assumenda maxime, corrupti officiis maiores eos quae voluptatibus nulla non explicabo tempore voluptates incidunt similique quis eaque necessitatibus dolores quod architecto minima autem iusto debitis iste a fugit. Suscipit, aliquam ipsa! Officia aperiam quisquam alias cum nostrum ipsa aliquid atque distinctio ducimus, quibusdam, aut maiores pariatur quaerat laudantium, sint reiciendis! Aut laborum ipsum repellendus nulla a optio impedit amet velit vel, consequuntur laudantium, ea placeat facilis dolore dignissimos! Provident repudiandae laborum cupiditate culpa labore ea natus rerum explicabo, obcaecati quas quisquam, dignissimos sapiente unde fugiat voluptatibus illo quae aliquam quo! Modi laborum perferendis ipsum dicta aperiam, cumque omnis nam! Delectus, saepe non! Voluptatibus, delectus. Exercitationem vel, cupiditate quasi recusandae libero repellendus vero! Facere blanditiis fugit explicabo beatae dignissimos tenetur consequuntur! Laborum animi cum porro at. Quibusdam earum veritatis voluptatum fugiat et mollitia neque vitae quae sit laudantium similique ad nihil cum, accusantium unde quod totam. Tempora voluptate nostrum nobis quisquam nesciunt reiciendis qui ducimus odio ratione ullam. Distinctio doloribus rerum temporibus quibusdam cumque animi deleniti iste a! Facere, necessitatibus at voluptates laudantium, tempore facilis rem ex quos libero vel labore eius nostrum asperiores quam quod. Similique, dolorem? Dolorem nobis eaque aliquam necessitatibus fugiat animi consequuntur officiis dolor at minus modi totam est natus molestias facilis tempora sapiente optio, aut officia esse suscipit nostrum, sit soluta? Autem maxime in tempora quo quae adipisci porro deleniti non. Vel a eum corporis officia aliquid id odio enim voluptatum, nesciunt deleniti iste alias neque perferendis! Dolores laborum itaque vel eligendi sed commodi corrupti est consectetur, dolore voluptates at magnam ab provident deleniti animi harum cupiditate deserunt ratione cum ducimus voluptatum, dolorum consequuntur. Iure saepe dignissimos reprehenderit impedit sed necessitatibus incidunt voluptatibus earum itaque, autem doloremque nihil. Incidunt, necessitatibus? Amet repellat soluta laudantium accusantium repudiandae, aut quos quae. Enim recusandae itaque sed commodi debitis laudantium consequatur quo saepe. Eveniet natus officia rerum provident vitae accusantium sed quos, iste vero eum culpa, quisquam omnis veniam veritatis delectus dolorum! Tenetur eius eaque vel, quos iusto nam quam assumenda quidem voluptas repellat veniam recusandae sint? Amet officia libero pariatur, culpa laborum iure quasi doloremque aperiam at deleniti quisquam numquam maiores nulla corporis vero nihil atque molestias porro nemo debitis assumenda odio necessitatibus?';
  }

  trigger() {
    const messageHTML = this.#createMarkup();
    document.body.append(messageHTML);

    setTimeout(() => {
      messageHTML.classList.remove('show');
      setTimeout(() => {
        messageHTML.remove();
      }, 1000);
    }, 3000);
  }

  #createMarkup() {
    const divMessage = document.createElement('div');
    divMessage.className = 'message__container';
    divMessage.classList.add('show');
    const text = document.createElement('p');
    text.className = 'message__text';
    text.innerText = `${this.#createMessage(
      this.#message,
      this.#numberOfChars
    )}`;
    divMessage.append(text);

    return divMessage;
  }

  #createMessage(str, quantityOfChars) {
    const idxStartSlice = random(0, str.length);
    const idxEndSlice =
      idxStartSlice + quantityOfChars > str.length
        ? str.length
        : idxStartSlice + quantityOfChars;
    const resultStr = str.slice(idxStartSlice, idxEndSlice).trim();
    let resultMessage = resultStr[0].toUpperCase();
    for (const letter of resultStr) {
      resultMessage += letter;
    }
    return resultMessage;
  }
}
