import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute } from '../modal';

export const checkNavigation = function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      changeHistory('home');
      getFilms().then(data => renderGallery(data));
      homePageMarkupUpdate();
    } else if (e.target.textContent === 'MY LIBRARY') {
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
    } else if (e.target.parentNode.dataset.index === 'card') {
      setModalAttribute(e.target.parentNode);
    }
  }
};
