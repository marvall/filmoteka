import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute, showTeam } from '../modal';
import { spinner } from '../spinner';

const changeStartedPage = function (address) {
  changeHistory(address);
  homePageMarkupUpdate();
  spinner.show();
  getFilms().then(data => renderGallery(data));
  setTimeout(() => {
    spinner.hide();
  }, 1000);
};

export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.currentTarget === window) {
    //Started HOME PAGE
    changeStartedPage('home');
  } else if (e.target !== e.currentTarget) {
    //Started HOME PAGE
    changeStartedPage('home');
    if (checkClickTarget(e)) {
    } else if (e.target.textContent === 'MY LIBRARY') {
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
      spinner.show();
      //тут должна быть отрисовка моей библиотеки.
      setTimeout(() => {
        spinner.hide();
      }, 1000);
    } else if (e.target.parentNode.dataset.index === 'card') {
      //this func open modal in gallery
      setModalAttribute(e.target.parentNode);
    } else if (e.target.dataset.index === 'team') {
      //this func open modal in footer
      showTeam(e.target);
    }
  }
};
