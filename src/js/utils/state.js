import getFromStorage from '../components/getFromStorage';

/**
 * This class stores the state of the page
 */
export class State {
  constructor() {
    this._page = 'home';
    this._auth = undefined;
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
    let status = getFromStorage('state');
    if (status !== null) {
      this.Page = getFromStorage('state');
    } else {
      this.Page = 'home';
    }
  }
  set Auth(value) {
    if (value !== undefined) {
      this._auth = value;
    }
  }
  get Auth() {
    return this._auth;
  }
}
