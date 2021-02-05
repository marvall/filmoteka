import cardTemplate from '../../templates/cardTemplate.hbs';
import cardForOneMovies from '../../templates/cardForOneMovies.hbs';
import { makeCardsNotActive } from '../components/searchList';
/**
 * this function renders to gallery card film from objects
 * @param {massiv objects} objects
 */
export const renderGallery = function (objects) {
  document.querySelector("[data-index='gallery']").innerHTML = '';
  if (objects.id) {
    document.querySelector('[data-index="pagination"]').innerHTML = '';
    document
      .querySelector("[data-index='gallery']")
      .insertAdjacentHTML('afterbegin', cardForOneMovies(objects));
  } else {
    document
      .querySelector("[data-index='gallery']")
      .insertAdjacentHTML('afterbegin', cardTemplate(objects));
    makeCardsNotActive();
  }
};
