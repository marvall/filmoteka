import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination } from '../api';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute, showTeam } from '../modal';
import { spinner } from '../spinner';
import initPagination from '../pagination/paginationInit';

const changeStartedPage = function (address) {
  changeHistory(address);
  homePageMarkupUpdate();
  spinner('start');
  // getFilms().then(data => {
  //   initPagination(); // Подключил функцию Пагинации ТУТ!
  //   renderGallery(data);
  // });
  getFilmsPagination().then(data => {
    renderGallery(data.results);
    initPagination(data);
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
    }
  }
};
