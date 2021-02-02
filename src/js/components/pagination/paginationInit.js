import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination } from '../api';
import { spinner } from '../spinner';
import { containerLS } from './paginationLS';
import arrowTop from '../arrowTop';

import { paginationSizeChanger } from './mediaQuery';

export const container = $('[data-index="pagination"]');
arrowTop();

/**
 * this function shows hidden movies when a button is pressed
 */

export function showMoreCards(totalRes = 20) {
  const btnShowMore = document.querySelector('[data-index="btn-show-more"]');
  const cards = document.querySelectorAll('[data-index="card"]');

  if (totalRes <= paginationSizeChanger()) {
    btnShowMore.style.display = 'none';
  } else {
    show();
  }

  function show() {
    btnShowMore.style.display = 'block';
    btnShowMore.innerHTML = `<p>Show all this page movies</p>`;

    btnShowMore.addEventListener('click', btnShowMoreHandler);

    function btnShowMoreHandler(e) {
      cards.forEach(card => {
        spinner('start');
        card.style.display = 'block';
        spinner('stop');
      });

      btnShowMore.style.display = 'none';
      btnShowMore.removeEventListener('click', btnShowMoreHandler);
    }
  }
}

/**
 * this function initializes pagination,
 * renders the page markup when the page button is clicked.
 * data takes the object from api
 * query takes dynamic search value
 * @param {object} data
 * @param {string} query
 */

async function initPagination(data, query) {
  const paginationWrapper = document.querySelector('[data-index="pagination"]');

  paginationWrapper.innerHTML = '';

  containerLS.hide();
  container.show();

  const sources = data.results;
  const totalResults = data.total_pages * paginationSizeChanger();

  const dataArray = new Array(totalResults);

  const options = {
    dataSource: dataArray,

    pageSize: paginationSizeChanger(),
    pageRange: 2,

    autoHidePrevious: true,
    autoHideNext: true,

    triggerPagingOnInit: false,

    callback: function (response, pagination) {
      console.log('pagination', pagination);
      console.log('page number', pagination.pageNumber);
      var dataHtml = '';
      dataHtml += '</ul>';

      container.prev().html(dataHtml);

      const num = pagination.pageNumber;
      getFilmsPagination(query, num).then(({ results }) => {
        spinner('start');
        renderGallery(results);
        spinner('stop');
        showMoreCards(results.length);
        console.log('results', results.length);
      });
    },
  };

  container.pagination(options);
  showMoreCards(sources.length);
}

export default initPagination;
