import PreloaderView from "./preloader-view";
import {changeView} from '../until';

class PreloaderScreen {
  constructor() {
    this.view = new PreloaderView();
  }
  init() {
    changeView(this.view);
  }
  hide() {
    this.view.element.parentNode.removeChild(this.element);
  }
}
const preloaderScreen = new PreloaderScreen();
export default preloaderScreen;
