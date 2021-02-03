import * as $ from 'jquery';

import './paginationPlugin';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination } from '../api';
import { spinner } from '../spinner';
import { containerLS } from './paginationLS';
import arrowTop from '../arrowTop';

export const container = $('[data-index="pagination"]');
arrowTop();

/**
 * this function shows hidden movies when a button is pressed
 */
function showMoreCards() {
  const btnShowMore = document.querySelector('[data-index="btn-show-more"]');

  btnShowMore.style.display = 'block';
  btnShowMore.innerHTML = `<p>Show all this page movies (20)</p>`;

  btnShowMore.addEventListener('click', btnShowMoreHandler);

  function btnShowMoreHandler() {
    const cards = document.querySelectorAll('[data-index="card"]');

    cards.forEach(card => {
      spinner('start');
      card.style.display = 'block';
      spinner('stop');
    });
    btnShowMore.style.display = 'none';
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
  showMoreCards();

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
      showMoreCards();
    });
  }
}

export default initPagination;

// initPagination();
