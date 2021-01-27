import cardTemplate from '../../templates/cardTemplate.hbs';
/**
 * this function render to gallery card film from objects
 * @param {massiv objects} objects
 */
export const renderGallery = function (objects) {
  if (objects.length === 1) {
    // there will be function (HBS - make a one card).
  } else {
    document
      .querySelector("data-index='gallery'")
      .insertAdjacentHTML('afterbegin', cardTemplate(objects));
  }
};
