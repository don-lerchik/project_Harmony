/* import getElementFromTemplate from '../getElementFromTemplate';
import {pageViewContent} from '../pageView';
import drawGreeting from './greeting';

const drawIntro = (state) => {
  const node = getElementFromTemplate(`
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
    `);

  const asteriskBtn = node.querySelector(`.intro__asterisk`);
  asteriskBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    pageViewContent(drawGreeting(state));

  });
  return node;
};

export default drawIntro;

 */
