//  Пока закоментил, так как при динамическом рендере выдаёт ошибку

import { getFilmsPagination, getFilmInfo } from './api';
import initPagination from './pagination/paginationInit';
import { renderGallery } from './renderGallery';
const _ = require('lodash');

const starSearch = function (searchString) {
  getFilmsPagination(searchString).then(data => {
    document
      .querySelector('[data-index="fetchStatus"]')
      .classList.remove('hidden');
    if (data.total_results === 0) {
      document.querySelector('[data-index="fetchStatus"]').textContent =
        'Search result not successful! Enter the correct movie name and genre!';
    } else if (data.total_results === 1) {
      document.querySelector('[data-index="fetchStatus"]').textContent =
        'Search result are successful! Searched one result';
      getFilmInfo(data.results[0].id).then(data => {
        renderGallery(data);
      });
    } else {
      document.querySelector(
        '[data-index="fetchStatus"]',
      ).textContent = `Search result are successful! Searched ${data.total_results} result`;
      renderGallery(data.results);
      initPagination(data);
    }
    setTimeout(() => {
      document
        .querySelector('[data-index="fetchStatus"]')
        .classList.remove('hidden');
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
};
