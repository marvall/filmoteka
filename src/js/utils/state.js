import getFromStorage from '../components/getFromStorage';

/**
 * This class stores the state of the page
 */
export class State {
  constructor() {
    this._page = 'home';
  }
  get Page() {
    return this._page;
  }
  set Page(value) {
    this._page = value;
  }
  static saveState(value) {
    localStorage.setItem('state', value);
    this.Page = value;
  }
  static checkState() {
    if (getFromStorage('state') !== '') {
      this.Page = getFromStorage('state');
    }
  }
}
