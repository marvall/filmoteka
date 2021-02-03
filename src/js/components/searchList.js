import searchListTempl from '../../templates/searchListTempl.hbs';

function renderListSearch(objects) {
  let arrRender = sortByRating(objects);
  if (arrRender.length > 6) {
    arrRender = objects.slice(0, 5);
  }
  const searchListRef = document.querySelector("[data-index='card-list']");
  const markup = searchListTempl(arrRender);
  searchListRef.innerHTML = markup;
}

function sortByRating(array) {
  return array.sort((a, b) => b.vote_average - a.vote_average);
}

export { renderListSearch };
