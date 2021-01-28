import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';

const header = document.querySelector('[data-index="header"]');
const homeBtn = document.querySelector('[data-index="home"]');
const mylibraryBtn = document.querySelector('[data-index="mylibrary"]');
const gallery = document.querySelector('[data-index="gallery"]');

export const checkNavigation = function (e) {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    if (
      e.target.parentElement.nodeName === 'A' ||
      e.target.nodeName === 'A' ||
      e.target.nodeName === 'use' ||
      e.target.textContent === 'HOME'
    ) {
      changeHistory('home');
      getFilms().then(data => renderGallery(data));
      header.classList.remove('header__background-myLibrary');
      header.classList.add('header__background-home');
      mylibraryBtn.classList.remove('current');
      homeBtn.classList.add('current');
    } else if (e.target.textContent == 'MY LIBRARY') {
      changeHistory('mylibrary');
      header.classList.remove('header__background-home');
      header.classList.add('header__background-myLibrary');
      gallery.innerHTML = '';
      homeBtn.classList.remove('current');
      mylibraryBtn.classList.add('current');
    }
  }
};
