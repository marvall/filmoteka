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

export const checkNavigation = function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      changeHistory('home');
      spinner.show();
      getFilms().then(data => renderGallery(data));
      homePageMarkupUpdate();
      setTimeout(() => {
        spinner.hide();
      }, 1000);
    } else if (e.target.textContent === 'MY LIBRARY') {
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
    } else if (e.target.parentNode.dataset.index === 'card') {
      //this func open modal in gallery
      setModalAttribute(e.target.parentNode);
    } else if (e.target.dataset.index === 'team') {
      showTeam(e.target);
    }
  }
};
