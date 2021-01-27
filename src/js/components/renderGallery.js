import cardTemplate from '../../templates/cardTemplate.hbs';
import cardForOneMovies from '../../templates/cardForOneMovies.hbs';
/**
 * this function render to gallery card film from objects
 * @param {massiv objects} objects
 */
export const renderGallery = function (objects) {
  console.log(objects);
  if (objects.length === 1) {
    document
      .querySelector("[data-index='gallery']")
      .insertAdjacentHTML('afterbegin', cardForOneMovies(objects));
  } else {
    document
      .querySelector("[data-index='gallery']")
      .insertAdjacentHTML('afterbegin', cardTemplate(objects));
  }
};
