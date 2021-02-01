import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination, getFilmInfo, getRenres } from '../api';
// import { reMapFilmsArray } from '../reMapFilmsArray';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute, showTeam } from '../modal';
import { spinner } from '../spinner';
import initPagination from '../pagination/paginationInit';
import { getSearch } from '../keyWorldSearch';
import { addToStorage } from '../addToStorage';
import getFromStorage from '../getFromStorage';

const changeStartedPage = function (address) {
  changeHistory(address);
  homePageMarkupUpdate();
  spinner('start');
  getFilmsPagination().then(data => {
    renderGallery(data.results);
    initPagination(data);
    getSearch();
  });
  spinner('stop');
};

export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.type === 'DOMContentLoaded') {
    //Started HOME PAGE
    changeStartedPage('home');
  } else if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      //Started HOME PAGE
      changeStartedPage('home');
    } else if (e.target.textContent === 'MY LIBRARY') {
      document.querySelector("[data-index='pagination']").innerHTML = '';
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
      spinner('start');
      //тут должна быть отрисовка моей библиотеки.
      spinner('stop');
    } else if (e.target.parentNode.dataset.index === 'card') {
      //this func open modal in gallery
      setModalAttribute(e.target.parentNode);
    } else if (e.target.dataset.index === 'team') {
      //this func open modal in footer
      showTeam(e.target);
    } else if (e.target.dataset.index === 'btn-to-wached') {
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'watched');
        },
      );
    } else if (e.target.dataset.index === 'btn-to-queue') {
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'queue');
        },
      );
    } else if (e.target.dataset.index === 'watched') {
      // let slon = getFromStorage('watched');
      // console.log(slon.length);
      renderGallery(getFromStorage('watched'));
      //initPagination({
      //  results: slon,
      //  total_pages: slon.length / 20 + 1,
      //});
    } else if (e.target.dataset.index === 'queue') {
      renderGallery(getFromStorage('queue'));
      //initPagination(getFromStorage('queue'));
    }
  }
};
