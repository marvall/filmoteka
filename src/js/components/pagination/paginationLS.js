import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';
// import { getFilmsPagination } from '../api';
import { spinner } from '../spinner';
import { container } from './paginationInit';

export const containerLS = $('[data-index="paginationLS"]');

async function initPaginationLS(results) {
  const paginationWrapper = document.querySelector(
    '[data-index="paginationLS"]',
  );
  paginationWrapper.removeEventListener('mouseup', onClickPageHandler);

  container.hide();
  containerLS.show();

  const options = {
    dataSource: results,

    totalNumber: results.length,

    pageSize: 9,
    // pageSize: setSize(),
    pageRange: 2,

    autoHidePrevious: true,
    autoHideNext: true,

    callback: function (response, pagination) {
      //   console.log(pagination);
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
