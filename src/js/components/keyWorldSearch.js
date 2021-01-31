//  Пока закоментил, так как при динамическом рендере выдаёт ошибку

import { getFilmsPagination, getFilmInfo } from './api';
import initPagination from './pagination/paginationInit';
import { renderGallery } from './renderGallery';
import { spinner } from './spinner';
const _ = require('lodash');

const starSearch = function (searchString) {
  let fetchStatus = document.querySelector('[data-index="fetchStatus"]');
  fetchStatus.classList.remove('error');
  fetchStatus.classList.remove('success');
  getFilmsPagination(searchString).then(data => {
    fetchStatus.classList.remove('hidden');
    if (data.total_results === 0) {
      fetchStatus.textContent =
        'Search result not successful! Enter the correct movie name and genre!';
      fetchStatus.classList.add('error');
    } else if (data.total_results === 1) {
      fetchStatus.textContent =
        'Search result are successful! Searched one result';
      fetchStatus.classList.add('success');
      spinner('start');
      getFilmInfo(data.results[0].id).then(data => {
        renderGallery(data);
      });
      spinner('stop');
    } else {
      fetchStatus.textContent = `Search result are successful! Searched ${data.total_results} result`;
      fetchStatus.classList.add('success');
      spinner('start');
      renderGallery(data.results);
      initPagination(data);
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
    }, 1250),
  );
  document
    .querySelector('[data-index="form"]')
    .addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        e.preventDefault();
      }
    });
};
