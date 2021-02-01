import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';

import { spinner } from '../spinner';
import { container } from './paginationInit';

import { paginationSizeChanger } from './mediaQuery';

export const containerLS = $('[data-index="paginationLS"]');

function initPaginationLS(results) {
  const paginationWrapper = document.querySelector(
    '[data-index="paginationLS"]',
  );
  paginationWrapper.removeEventListener('mouseup', onClickPageHandler);

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

      containerLS.prev().html(dataHtml);
    },
  };

  containerLS.pagination(options);
  paginationWrapper.addEventListener('mouseup', onClickPageHandler);

  function onClickPageHandler(event) {
    if (event.target.parentNode.classList.contains('paginationjs-ellipsis')) {
      return;
    }

    spinner('start');
    renderGallery(results);
    spinner('stop');
  }
}

export default initPaginationLS;
