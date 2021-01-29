import home from './../../templates/headers/home.hbs';
import myLibery from './../../templates/headers/myLibery.hbs';
/**
 * this function renders dinamic element to 'headerDinamicContent'
 * @param {event} e
 */
export const renderHeader = function (e) {
  e.preventDefault();
  let path = window.location.origin;

  console.log(path);

  console.log(window.location.origin);

  let ref = document.querySelector("[data-index='headerDinamicContent']");
  ref.innerHTML = '';
  if (window.location.href === path + '/filmoteka/home') {
    ref.insertAdjacentHTML('afterbegin', home());
  } else if (window.location.href === path + '/filmoteka/mylibrary') {
    ref.insertAdjacentHTML('afterbegin', myLibery());
  }
};
