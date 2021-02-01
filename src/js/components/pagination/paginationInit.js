import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination } from '../api';
import { spinner } from '../spinner';
import { containerLS } from './paginationLS';

/**
 * this function initializes pagination,
 * renders the page markup when the page button is clicked.
 * query takes dynamic search value
 * @param {string} query
 */

export const container = $('[data-index="pagination"]');

async function initPagination(data, query) {
  //query ключевое слово.

  const paginationWrapper = document.querySelector('[data-index="pagination"]');
  paginationWrapper.removeEventListener('mouseup', onClickPageHandler);
  paginationWrapper.textContent = '';

  containerLS.hide();
  container.show();

  // const data = await getFilmsPagination(query);
  const sources = data.results;
  const totalResults = data.total_results;

  const arrayCountElem = new Array(totalResults - data.results.length);
  const dataArray = sources.concat(arrayCountElem);

  const options = {
    dataSource: dataArray,

    pageSize: 20,
    pageRange: 2,

    autoHidePrevious: true,
    autoHideNext: true,

    // triggerPagingOnInit: false,

    callback: function (response, pagination) {
      var dataHtml = '';
      dataHtml += '</ul>';

      container.prev().html(dataHtml);
    },
  };

  container.pagination(options);

  paginationWrapper.addEventListener('mouseup', onClickPageHandler);

  function onClickPageHandler(event) {
    if (event.target.parentNode.classList.contains('paginationjs-ellipsis')) {
      return;
    }

    let num = 0;

    if (event.target.nodeName === 'A') {
      num = +event.target.parentNode.dataset.num;
    } else if (event.target.nodeName === 'LI') {
      num = +event.target.dataset.num;
    } else {
      return;
    }
    spinner('start');

    getFilmsPagination(query, num).then(({ results }) => {
      renderGallery(results);
      spinner('stop');
    });
  }
}

export default initPagination;

// initPagination();
