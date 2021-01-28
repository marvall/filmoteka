import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';

export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      changeHistory('home');
      getFilms().then(data => renderGallery(data));
      homePageMarkupUpdate();
    } else if (e.target.textContent === 'MY LIBRARY') {
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
    }
  }
};
