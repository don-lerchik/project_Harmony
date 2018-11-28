import app from '../app';
import WelcomeView from './welcome-view';
import {changeView} from '../until';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      app.showRules();
    };
  }
}

const welcomeScreen = new WelcomeScreen();
export default welcomeScreen;
