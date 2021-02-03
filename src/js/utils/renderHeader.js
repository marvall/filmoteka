import home from './../../templates/headers/home.hbs';
import myLibery from './../../templates/headers/myLibery.hbs';
import { State } from './state';

/**
 * this function renders dinamic element to 'headerDinamicContent'
 * @param {event} e
 */
export const renderHeader = function (e) {
  e.preventDefault();
  let ref = document.querySelector("[data-index='headerDinamicContent']");
  ref.innerHTML = '';
  if (State.Page === 'home') {
    ref.insertAdjacentHTML('afterbegin', home());
  } else if (State.Page === 'mylibrary') {
    ref.insertAdjacentHTML('afterbegin', myLibery());
  }
};
