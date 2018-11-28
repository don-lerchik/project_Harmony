import AbstractView from '../view';
import header from '../block/header';
import footer from '../block/footer';
import {changeImg} from '../perfom/changeImg';

const TypeOFGame = {
  ONE: `tinder-like`,
  TWO: `two-of-two`,
  THREE: `one-of-three`
};

const formType = (typeGame) => {
  if (typeGame === TypeOFGame.ONE) {
    return `game__content--wide`;
  }
  if (typeGame === TypeOFGame.THREE) {
    return `game__content--triple`;
  }
  return ``;
};

export default class GameView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
    this.typeGame = this.level.type;
  }
  get template() {
    return `\
    ${header(this.state)}
    <div class="game">
      <p class="game__task">${this.level.question}</p>
      <form class="game__content ${formType(this.typeGame)}">
      ${this.level.answers.map((answer, i) =>
        `<div class="game__option">
          <img src="${answer.image.url}" alt="Option ${i + 1}">
          ${(this.typeGame !== TypeOFGame.THREE) ?
          `<label class="game__answer game__answer--photo">
              <input name="question${i + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
           <label class="game__answer game__answer--paint">
              <input name="question${i + 1}" type="radio" value="painting">
              <span>Рисунок</span>
            </label>`
          : ``}
        </div>`).join(``)}
      </form>
      <div class="stats">
        <ul class="stats">
        ${this.state.answers.map((elem) =>
        `<li class="stats__result ${elem}"></li>`).join(``)}
        </ul>
      </div>
    </div>
    ${footer()}`;
  }
  bind() {
    const form = this.element.querySelector(`.game__content`);
    const imageList = this.element.querySelectorAll(`.game__option img`);
    this.timeElement = this.element.querySelector(`.game__timer`);

    imageList.forEach((element) => {
      element.addEventListener(`load`, () => {
        changeImg(element);
      });
    });


    if (this.typeGame === TypeOFGame.TWO) {
      form.addEventListener(`change`, () => {
        const answer1 = form.querySelector(`[name="question1"]:checked`);
        const answer2 = form.querySelector(`[name="question2"]:checked`);
        if (answer1 && answer2) {
          this.userChoseTwo(answer1.value, answer2.value);
        }
      });
    }
    if (this.typeGame === TypeOFGame.ONE) {
      form.addEventListener(`change`, () => {
        const answer = form.querySelector(`[name="question1"]:checked`);
        if (answer) {
          this.userChoseOne(answer.value);
        }
      });
    }
    if (this.typeGame === TypeOFGame.THREE) {
      const pictureList = form.querySelectorAll(`.game__option`);
      pictureList.forEach((picture, index) => {
        picture.addEventListener(`click`, () => {
          this.userClick(index);
        });
      });
    }

    const backButton = this.element.querySelector(`.header__back`);
    backButton.addEventListener(`click`, () => {
      this.back();
    });
  }

  updateTime(time, bool) {
    this.timeElement.textContent = time;
    if (bool) {
      this.timeElement.classList.add(`game__timer--blink`);
    }
  }

  userChoseTwo() {

  }
  userChoseOne() {

  }
  userClick() {

  }
  back() {

  }
}
