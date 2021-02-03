//  Пока закоментил, так как при динамическом рендере выдаёт ошибку

import { getFilmsPagination, getFilmInfo } from './api';
import initPagination from './pagination/paginationInit';
import { renderGallery } from './renderGallery';
import { spinner } from './spinner';
import { checkFilmInStack } from './checkFimlInStack';
import { addSearchList } from './searchList';
const _ = require('lodash');
import { showMoreCards } from './pagination/paginationInit';

/**
 * This function search query in search-line.
 * It have 3 state: not found, one request searched,
 * more that one request searched. If request not null start render gallery.
 * @param {string} searchString
 */
const starSearch = function (searchString) {
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
      getFilmInfo(data.results[0].id)
        .then(data => {
          renderGallery(data);
          showMoreCards(1);
        })
        .then(() => checkFilmInStack());
      spinner('stop');
    } else {
      document.querySelector("[data-index='card-list']").innerHTML = '';
      fetchStatus.textContent = `Search result are successful! Searched ${data.total_results} result`;
      fetchStatus.classList.add('success');
      spinner('start');
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
      addSearchList(e.target.value);
    }, 500),
  );
  document
    .querySelector('[data-index="form"]')
    .addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        starSearch(e.target.value);
        // e.target.value = ''; // очищает поле поиска при сабмите,можно и не очисщать
      }
    });
};
