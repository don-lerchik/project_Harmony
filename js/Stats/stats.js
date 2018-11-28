import app from '../app';
import StatsView from "./stats-view";
import PreloaderView from "../Preloader/preloader-view";
import {changeView} from '../until';
import {settingGames} from '../data/data';
import Model from '../model';
import statsAdapter from './stats-adapter';

export default class StatstScreen {
  constructor(state) {
    this.state = state;
    this.view = new PreloaderView();
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${settingGames.serverId}`;
      }
      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${settingGames.serverId}`;
      }
    }();

  }
  init() {
    changeView(this.view);
    this.model.send(this.state, statsAdapter).then(() => {

      this.model.load(statsAdapter).then((data) => {
        this.view = new StatsView(this.state, data);
        changeView(this.view);

        this.view.back = () => {
          app.showWelcome();
        };

      }).catch(window.console.error);

    }).catch(window.console.error);
  }
}
