/* import getElementFromTemplate from '../getElementFromTemplate';
import { pageViewContent, pageViewHeader } from '../pageView';
import drawGame3 from './game-3';
import drawHeader from '../block/header';
import { levels } from '../data/data';
import { changeImg } from '../perfom/changeImg';

const drawGame2 = (state) => {
  pageViewHeader(drawHeader(state));
  const node = getElementFromTemplate(`
  <div class="game">
    <p class="game__task">${levels[state.level].question}</p>
    <form class="game__content  game__content--wide">
    ${[...Object.entries(levels[state.level].answers)].map(([answer], i) =>
      `<div class="game__option">
        <img src="${answer}" alt="Option 1">
        <label class="game__answer game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
      ${state.answers.map((elem) =>
      `<li class="stats__result ${elem}"></li>`).join(``)}
      </ul>
    </div>
  </div>
  `);

  const form = node.querySelector(`.game__content`);
  const imageList = node.querySelectorAll(`.game__option img`);
  imageList.forEach((element) => {
    element.addEventListener(`load`, () => {
      changeImg(element);
    });
  });

  form.addEventListener(`change`, () => {
    if (form.querySelector(`[name="question1"]:checked`)) {
      const destination = `3`;
      pageViewContent(drawGame3(Object.assign({}, state, {
        level: destination
      })));
    }
  });

  return node;
};

export default drawGame2;

 */
