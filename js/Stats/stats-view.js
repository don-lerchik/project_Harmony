import AbstractView from '../view';
import header from '../block/header';
import footer from '../block/footer';
import {countPoint} from '../data/data';

export default class StatsView extends AbstractView {
  constructor(state, usersStats) {
    super();
    this.state = Object.assign({}, state);
    this.usersStats = usersStats;
  }
  get template() {
    return `\
    ${header()}
    ${this.drawStats([this.state])}
    <h2>Топ игроков</h2>
    ${this.drawStats(this.usersStats)}
    ${footer()}`;
  }
  bind() {
    const backButton = this.element.querySelector(`.header__back`);
    backButton.addEventListener(`click`, () => {
      this.back();
    });
  }

  drawStats(statsArray) {
    if (statsArray) {
      return `\
        ${statsArray.map((usersStats) => {
          const userPoint = countPoint(usersStats.answers, usersStats.lives);
          return `\
          <table class="result__table">
            <tr>
              <td class="result__number">${usersStats.name}</td>
              <td colspan="2">
                <ul class="stats">
                ${usersStats.answers.map((stats) =>
              `<li class="stats__result ${stats}"></li>`).join(``)}
                </ul>
              </td>
              ${(usersStats.point !== 0) ?
              `<td class="result__points">×&nbsp;100</td>
                <td class="result__total">${userPoint.simple}</td>
            </tr>
            ${(userPoint.fast.count !== 0) ?
                `\
              <tr>
                <td></td>
                <td class="result__extra">Бонус за скорость:</td>
                <td class="result__extra">${userPoint.fast.count}&nbsp;
                  <span class="stats__result stats__result--fast"></span>
                </td>
                <td class="result__points">×&nbsp;50</td>
                <td class="result__total">${userPoint.fast.sum}</td>
              </tr>`
                : ``}
            ${(userPoint.slow.count !== 0) ?
                `\
              <tr>
                <td></td>
                <td class="result__extra">Штраф за медлительность:</td>
                <td class="result__extra">${userPoint.slow.count}&nbsp;
                  <span class="stats__result stats__result--slow"></span>
                </td>
                <td class="result__points">×&nbsp;50</td>
                <td class="result__total">${userPoint.slow.sum}</td>
              </tr>`
                : ``}
              <tr>
                <td></td>
                <td class="result__extra">Бонус за жизни:</td>
                <td class="result__extra">${userPoint.live.count}&nbsp;
                  <span class="stats__result stats__result--heart"></span>
                </td>
                <td class="result__points">×&nbsp;50</td>
                <td class="result__total">${userPoint.live.sum}</td>
              </tr>
              <tr>
                <td colspan="5" class="result__total  result__total--final">${usersStats.point}</td>
              </tr>`
              : `<td class="result__total"></td>
              <td class="result__total  result__total--final">fail</td>`
            }
          </table>`;
        }).join(``)} `;
    }
    return ``;
  }

  back() {

  }
}
