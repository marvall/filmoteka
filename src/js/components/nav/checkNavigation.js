import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';

export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    if (e.target.textContent == 'FILMOTEKA' || e.target.textContent == 'HOME') {
      changeHistory('home');
      getFilms().then(data => renderGallery(data));
    } else if (e.target.textContent == 'MYLIBERY') {
      changeHistory('mylibery');
    }
  }
};
