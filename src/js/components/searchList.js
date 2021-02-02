import { getFilmsPagination, getFilmInfo } from './api';
import searchListTempl from '../../templates/searchListTempl.hbs';
import { spinner } from './spinner';
import { renderGallery } from './renderGallery';

function addSearchList(searchString) {
  document.querySelector("[data-index='card-list']").innerHTML = '';
  let fetchStatus = document.querySelector('[data-index="fetchStatus"]');
  fetchStatus.classList.remove('error');
  fetchStatus.classList.remove('success');
  if (searchString.trim() === '') {
    fetchStatus.classList.remove('hidden');
    fetchStatus.textContent =
      'Search result not successful! Enter the correct movie name and genre!';
    fetchStatus.classList.add('error');
    setTimeout(() => {
      fetchStatus.classList.add('hidden');
    }, 2000);
    return;
  }
  getFilmsPagination(searchString).then(data => {
    fetchStatus.classList.remove('hidden');
    if (data.total_results === 0) {
      fetchStatus.textContent =
        'Search result not successful! Enter the correct movie name and genre!';
      fetchStatus.classList.add('error');
    } else if (data.total_results === 1) {
      document.querySelector("[data-index='card-list']").innerHTML = '';
      fetchStatus.textContent =
        'Search result are successful! Searched one result';
      fetchStatus.classList.add('success');
      spinner('start');
      getFilmInfo(data.results[0].id).then(data => {
        renderGallery(data);
      });
      spinner('stop');
    } else {
      spinner('start');
      renderListSearch(data.results);
      spinner('stop');
    }
    setTimeout(() => {
      fetchStatus.classList.add('hidden');
    }, 2000);
  });
}

function renderListSearch(objects) {
  let arrRender = objects;
  if (objects.length > 6) {
    arrRender = objects.slice(0, 5);
  }
  const searchListRef = document.querySelector("[data-index='card-list']");
  const markup = searchListTempl(arrRender);
  searchListTempl;
  searchListRef.innerHTML = markup;
}

export { addSearchList };
