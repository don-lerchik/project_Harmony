import app from '../app';
import GameView from "./game-view";
import {changeView} from '../until';
import {initialState, settingGames, tick, setResult, setStats, nextLevel, setLives, getLevel} from '../data/data';

export default class GameScreen {
  constructor(userName, data) {
    this.state = Object.assign({}, initialState, {
      name: userName,
    });

    this.question = data;
    this.level = getLevel(this.state.level, this.question);
    this.view = new GameView(this.state, this.level);
  }

  init() {
    this.startTimer();
    changeView(this.view);
    this.view.userChoseTwo = (answer1, answer2) => {
      this.stopTimer(this.timer);
      if ((answer1 === this.view.level.answers[0].type) && (answer2 === this.view.level.answers[1].type)) {
        this.right();
      }
      if ((answer1 !== this.view.level.answers[0].type) || (answer2 !== this.view.level.answers[1].type)) {
        this.wrong();
      }
      this.next();
    };
    this.view.userChoseOne = (answer) => {
      this.stopTimer(this.timer);
      if (answer === this.view.level.answers[0].type) {
        this.right();
      }
      if (answer !== this.view.level.answers[0].type) {
        this.wrong();
      }
      this.next();
    };
    this.view.userClick = (indexAnswer) => {
      this.stopTimer(this.timer);
      if (/найдите рисунок/i.test(this.view.level.question)) {
        if (this.view.level.answers[indexAnswer].type === `painting`) {
          this.right();
        }
        if (this.view.level.answers[indexAnswer].type !== `painting`) {
          this.wrong();
        }
      }
      if (/найдите фото/i.test(this.view.level.question)) {
        if (this.view.level.answers[indexAnswer].type === `photo`) {
          this.right();
        }
        if (this.view.level.answers[indexAnswer].type !== `photo`) {
          this.wrong();
        }
      }
      this.next();
    };
    this.view.back = () => {
      this.stopTimer(this.timer);
      app.showWelcome();
    };
  }
  startTimer() {
    this.state.time = initialState.time;
    const warningTime = {
      time: 5,
      bool: false
    };
    this.timer = setInterval(() => {
      this.state = tick(this.state);
      if (this.state.time < warningTime.time) {
        warningTime.bool = true;
      }
      this.view.updateTime(this.state.time, warningTime.bool);
      if (this.state.time === 0) {
        this.stopTimer(this.timer);
        this.wrong();
        this.next();
      }
    }, 1000);
  }
  stopTimer(timer) {
    clearInterval(timer);
  }
  wrong() {
    this.state = setResult(this.state, setStats(false, this.state.time));
    this.state = setLives(this.state, this.state.lives - 1);
  }
  right() {
    this.state = setResult(this.state, setStats(true, this.state.time));
  }

  next() {
    if (this.state.lives === 0) {
      this.state.point = 0;
      return app.showStats(this.state);
    }
    if (this.state.level === settingGames.levelsCount) {
      return app.showStats(this.state);
    }
    this.state = nextLevel(this.state);
    this.level = getLevel(this.state.level, this.question);
    this.view = new GameView(this.state, this.level);
    return this.init();
  }
}

