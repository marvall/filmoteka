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
}
/**
  This function delete a pop-up bar
 */
function deleteListSearch() {
  const searchListRef = document.querySelector("[data-index='card-list']");
  searchListRef.innerHTML = '';
  searchListRef.classList.remove('open');
  document.removeEventListener('click', handlerCloseList);
}
/**
 * Auxiliary function. Is not exported.
 * This function sorted  objects of array descending by vote_average
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

export { renderListSearch, deleteListSearch };
