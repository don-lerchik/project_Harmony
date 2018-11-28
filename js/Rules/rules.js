import app from '../app';
import RulesView from "./rules-view";
import {changeView} from '../until';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);

    this.view.gameStart = (userName) => {
      app.showGame(userName);
    };
    this.view.back = () => {
      app.showWelcome();
    };
  }
}
const rulesScreen = new RulesScreen();

export default rulesScreen;
