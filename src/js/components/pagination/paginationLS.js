import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';

import { spinner } from '../spinner';
import { container } from './paginationInit';

import { paginationSizeChanger } from './mediaQuery';

export const containerLS = $('[data-index="paginationLS"]');

/**
 * this function initializes pagination with results from Local Storage,
 * renders the page markup when the page button is clicked.
 * @param {array} results
 */

function initPaginationLS(results) {
  const btnShowMore = document.querySelector('[data-index="btn-show-more"]');
  btnShowMore.style.display = 'none';
  const paginationWrapper = document.querySelector(
    '[data-index="paginationLS"]',
  );
  paginationWrapper.innerHTML = '';

  container.hide();
  containerLS.show();

  const options = {
    dataSource: results,

    totalNumber: results.length,
    pageSize: paginationSizeChanger(),
    pageRange: 2,

    autoHidePrevious: true,
    autoHideNext: true,

    callback: function (response, pagination) {
      var dataHtml = renderGallery(response);
      dataHtml += '</ul>';

      spinner('start');
      containerLS.prev().html(dataHtml);
      spinner('stop');
      window.scrollTo(pageXOffset, 0);
    },
  };

  window.scrollTo(pageXOffset, 0);
  containerLS.pagination(options);
  if (results.length <= paginationSizeChanger()) {
    containerLS.hide();
  }
}

export default initPaginationLS;
