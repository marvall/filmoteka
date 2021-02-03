import searchListTempl from '../../templates/searchListTempl.hbs';

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

  // searchListRef.addEventListener('click', handlerOpenFilm);
}

function sortByRating(array) {
  return array.sort((a, b) => b.vote_average - a.vote_average);
}

function deleteListSearch() {
  const searchListRef = document.querySelector("[data-index='card-list']");
  searchListRef.innerHTML = '';
  searchListRef.classList.remove('open');
  // searchListRef.removeEventListener('click', handlerOpenFilm);
}

// function handlerOpenFilm(e) {
//   e.preventDefault();
//   console.log('click list item', e.target);
//   // deleteListSearch();
//   if (!e.target.parentNode) {
//     console.log('close');
//     // deleteListSearch();
//     // return;
//   }
// }

export { renderListSearch, deleteListSearch };
