import app from '../app';
import IntroView from "./intro-view";
import {changeView} from '../until';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      app.showWelcome();
    };
  }
}

const introScreen = new IntroScreen();
export default introScreen;
