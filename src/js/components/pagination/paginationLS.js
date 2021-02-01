import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';

import { spinner } from '../spinner';
import { container } from './paginationInit';

import getFromStorage from '../getFromStorage';

const mediaQueryList = [
  window.matchMedia('(max-width: 767px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
  window.matchMedia('(min-width: 1024px)'),
];

const results = getFromStorage('queue');

export const containerLS = $('[data-index="paginationLS"]');

function paginationSizeChanger() {
  if (mediaQueryList[0].matches) {
    return 4;
  }
  if (mediaQueryList[1].matches) {
    return 8;
  }
  if (mediaQueryList[2].matches) {
    return 9;
  }
}

mediaQueryList.forEach(mediaQuery =>
  mediaQuery.addEventListener('change', () => initPaginationLS(results)),
);

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
