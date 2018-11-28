import AbstractView from '../view';
import footer from '../block/footer';

export default class PreloaderView extends AbstractView {
  get template() {
    return `\
      <div id="main" class="central__content">
        <div id="preloader" class="preloader">
          <div class="preloader__loading">
            <div class="preloader__bounceball"></div>
            <div class="preloader__text">Загрузка</div>
          </div>
        </div>
      </div>
      ${footer()}`;
  }
}
