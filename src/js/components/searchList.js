import searchListTempl from '../../templates/searchListTempl.hbs';
/**
 * This function render a pop-up bar with hits during search,
 * objects takes the array of objects from api
 * searchValue takes dynamic search value
 * @param {string} searchValue
 * @param {array} objects
 */
function renderListSearch(searchValue, objects) {
  if (!searchValue) {
    deleteListSearch();
    return;
  }
  let cloneObjects = JSON.parse(JSON.stringify(objects));
  let arrRender = sortByRating(cloneObjects);
  if (arrRender.length > 6) {
    arrRender = cloneObjects.slice(0, 5);
  }
  const searchListRef = document.querySelector("[data-index='card-list']");
  searchListRef.classList.add('open');
  const markup = searchListTempl(arrRender);
  searchListRef.innerHTML = markup;

  document.addEventListener('click', handlerCloseList);
  window.addEventListener('keydown', hendlerEscCloseList);
}
/**
  This function deletes a pop-up bar
 */
function deleteListSearch() {
  const searchListRef = document.querySelector("[data-index='card-list']");
  searchListRef.innerHTML = '';
  searchListRef.classList.remove('open');
  document.removeEventListener('click', handlerCloseList);
  window.removeEventListener('keydown', hendlerEscCloseList);
  makeCardsActive();
}
/**
 * Auxiliary function. Is not exported.
 * This function sorted objects of array descending by vote_average
 * @param {array} array
 *
 */
function sortByRating(array) {
  return array.sort((a, b) => b.vote_average - a.vote_average);
}
/**
 * Auxiliary function. Is not exported.
 * This function close a pop-up bar when clicked outside the element
 * @param {event} event
 *
 */
function handlerCloseList(event) {
  event.preventDefault();
  const searchListRef = document.querySelector("[data-index='card-list']");
  if (!searchListRef.contains(event.target)) {
    deleteListSearch();
  }
}
/**
 * Auxiliary function. Is not exported.
 * This function close a pop-up bar when clicked 'Esc'
 * @param {event} event
 *
 */
function hendlerEscCloseList({ code }) {
  if (code === 'Escape') {
    deleteListSearch();
  }
}
/**
 * this function makes cards under the pop-up bar insensitive to hover
 * when the pop-up bar is opened
 */
function makeCardsNotActive() {
  const searchListRef = document.querySelector("[data-index='card-list']");
  const cardImgs = document.querySelectorAll('[data-index="card-img"]');
  if (searchListRef.classList.contains('open')) {
    cardImgs.forEach((cardImg, index) => {
      if (index <= 2) {
        cardImg.classList.remove('card-img');
        cardImg.classList.add('not-active');
      }
    });
  }
}
/**
 * this function makes cards sensitive to hover when the pop-up bar is closed
 */
function makeCardsActive() {
  const searchListRef = document.querySelector("[data-index='card-list']");
  const cardImgs = document.querySelectorAll('[data-index="card-img"]');
  cardImgs.forEach((cardImg, index) => {
    if (index <= 2) {
      cardImg.classList.remove('not-active');
      cardImg.classList.add('card-img');
    }
  });
}

export { renderListSearch, deleteListSearch, makeCardsNotActive };
