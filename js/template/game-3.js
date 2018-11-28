/* import getElementFromTemplate from '../getElementFromTemplate';
import {pageViewContent, pageViewHeader} from '../pageView';
import drawStats from './stats';
import drawHeader from '../block/header';
import {levels} from '../data/data';
import {changeImg} from '../perfom/changeImg';

const drawGame3 = (state) => {
  pageViewHeader(drawHeader(state));
  const node = getElementFromTemplate(`
  <div class="game">
    <p class="game__task">${levels[state.level].question}</p>
    <form class="game__content  game__content--triple">
    ${[...Object.entries(levels[state.level].answers)].map(([answer], i) =>
      `<div class="game__option">
        <img src="${answer}" alt="Option 1">
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

  form.addEventListener(`click`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`game__option`)) {
      const destination = `end`;
      pageViewContent(drawStats(Object.assign({}, state, {
        level: destination
      })));
    }
  });

  return node;
};

export default drawGame3;

 */
