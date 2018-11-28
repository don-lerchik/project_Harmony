/* import getElementFromTemplate from '../getElementFromTemplate';
import {pageViewContent, pageViewHeader} from '../pageView';
import drawGame1 from './game-1';
import drawHeader from '../block/header';


const drawRules = (state) => {
  pageViewHeader(drawHeader(state));
  const node = getElementFromTemplate(`
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
  `);

  const rulesInput = node.querySelector(`.rules__input`);
  const rulesBtn = node.querySelector(`.rules__button`);

  rulesInput.addEventListener(`input`, () => {
    if (rulesInput.value.length > 3) {
      rulesBtn.disabled = false;
    }
    if (rulesInput.value.length <= 3) {
      rulesBtn.disabled = true;
    }
  });

  rulesBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const destination = `1`;
    pageViewContent(drawGame1(Object.assign({}, state, {
      level: destination
    })));

  });

  return node;
};

export default drawRules;

 */
