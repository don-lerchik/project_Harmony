import preloaderScreen from './Preloader/preloader';
import introScreen from './Intro/intro';
import welcomeScreen from './Welcome/welcome';
import rulesScreen from './Rules/rules';
import GameScreen from './Game/game';
import questAdapter from './data/quest-adapter';
import StatsScreen from './Stats/stats';
import Model from './model';

const ControllerId = {
  INTRO: ``,
  WELCOME: `welcome`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
    }();
  }

  init() {
    this.showPreloader();
    this.model.load(questAdapter)
      .then((data) => this.setup(data))
      .then((data) => {
        const {controller, state} = this.getHash();
        this.changeController(controller, state, data);
      })
      .catch(window.console.error);
  }
  setup(data) {
    this.routes = {
      [ControllerId.INTRO]: introScreen,
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: GameScreen,
      [ControllerId.STATS]: StatsScreen
    };

    window.onhashchange = () => {
      const {controller, state} = this.getHash();
      this.changeController(controller, state, data);
    };
    return data;
  }
  getHash() {
    const [controller, stateValue] = location.hash.split(`=`);
    return {
      controller: getControllerIdFromHash(controller),
      state: stateValue ?
        JSON.parse(atob(stateValue))
        : ``
    };
  }

  changeController(route = ``, state = ``, data) {
    const Controller = this.routes[route];
    if (state) {
      return new Controller(state, data).init();
    }
    return Controller.init();
  }

  showPreloader() {
    preloaderScreen.init();
  }

  showIntro() {
    location.hash = ControllerId.INTRO;
  }

  showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  showRules() {
    location.hash = ControllerId.RULES;
  }

  showGame(state) {
    const encodeState = btoa(JSON.stringify(state));
    location.hash = [ControllerId.GAME, encodeState].join(`=`);
  }

  showStats(state) {
    const encodeState = btoa(JSON.stringify(state));
    location.hash = [ControllerId.STATS, encodeState].join(`=`);
  }
}

const app = new Application();
export default app;
