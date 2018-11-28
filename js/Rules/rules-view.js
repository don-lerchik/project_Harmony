import AbstractView from '../view';
import header from '../block/header';
import footer from '../block/footer';
import {settingGames} from '../data/data';

export default class RulesView extends AbstractView {
  get template() {
    return `\
    ${header()}
    <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${settingGames.levelsCount} раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${settingGames.timeQuestion} секунд.<br>
      Ошибиться можно не более ${settingGames.maxLives} раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
    ${footer()}`;
  }
  bind() {
    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesBtn = this.element.querySelector(`.rules__button`);
    const backButton = this.element.querySelector(`.header__back`);
    rulesInput.addEventListener(`input`, () => {
      if (rulesInput.value.length > 3) {
        rulesBtn.disabled = false;
      }
      if (rulesInput.value.length <= 3) {
        rulesBtn.disabled = true;
      }
    });

    rulesBtn.addEventListener(`click`, () => {
      if (rulesInput.value.match(/[А-я]+/)) {
        rulesInput.setCustomValidity(`Нет кирилице !`);
        rulesInput.value = ``;
        return rulesInput.value;
      }
      return this.gameStart(rulesInput.value);
    });

    backButton.addEventListener(`click`, () => {
      this.back();
    });
  }

  gameStart() {
  }
  back() {
  }
}
