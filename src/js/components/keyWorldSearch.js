//  Пока закоментил, так как при динамическом рендере выдаёт ошибку

import { getFilmsPagination, getFilmInfo } from './api';
import initPagination from './pagination/paginationInit';
import { renderGallery } from './renderGallery';
import { spinner } from './spinner';
import { checkFilmInStack } from './checkFimlInStack';
import { renderListSearch, deleteListSearch } from './searchList';
const _ = require('lodash');
import { showMoreCards } from './pagination/paginationInit';

/**
 * This function search query in a search-line.
 * It has 3 states: not found, one request found,
 * more that one request found. If request is not a null it starts to render a gallery.
 * @param {string} searchString
 */
const starSearch = function (searchString) {
  let fetchStatus = document.querySelector('[data-index="fetchStatus"]');
  fetchStatus.classList.remove('error');
  fetchStatus.classList.remove('success');
  if (searchString.length > 0 && searchString.trim().length === 0) {
    deleteListSearch();
    fetchStatus.classList.remove('hidden');
    fetchStatus.textContent =
      'Search result is not successful! Enter the correct movie name and genre!';
    fetchStatus.classList.add('error');
    setTimeout(() => {
      fetchStatus.classList.add('hidden');
    }, 2000);
    return;
  }
  getFilmsPagination(searchString).then(data => {
    fetchStatus.classList.remove('hidden');
    if (data.total_results === 0) {
      deleteListSearch();
      fetchStatus.textContent =
        'Search result is not successful! Enter the correct movie name and genre!';
      fetchStatus.classList.add('error');
    } else if (data.total_results === 1) {
      deleteListSearch();
      fetchStatus.textContent =
        'Search result is successful! One result is found';
      fetchStatus.classList.add('success');
      spinner('start');
      getFilmInfo(data.results[0].id)
        .then(data => {
          renderGallery(data);
          showMoreCards(1);
        })
        .then(() => checkFilmInStack());
      spinner('stop');
    } else {
      fetchStatus.textContent = `Search results are successful! Found ${data.total_results} results`;
      fetchStatus.classList.add('success');
      spinner('start');
      renderListSearch(searchString, data.results);
      renderGallery(data.results);
      initPagination(data, searchString);
      showMoreCards(data.total_results);
      spinner('stop');
    }
    setTimeout(() => {
      fetchStatus.classList.add('hidden');
    }, 2000);
  });
};

export const getSearch = function () {
  document.querySelector('[data-index="serchInfo"]').addEventListener(
    'input',
    _.debounce(e => {
      e.preventDefault();
      starSearch(e.target.value);
    }, 500),
  );
  document
    .querySelector('[data-index="form"]')
    .addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
};
