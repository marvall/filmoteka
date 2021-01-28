import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilms } from '../api';

const header = document.querySelector('[data-index="header"]');
const homeBtn = document.querySelector('[data-index="home"]');
const mylibraryBtn = document.querySelector('[data-index="mylibrary"]');
const gallery = document.querySelector('[data-index="gallery"]');
const headerDinamicContent = document.querySelector(
  "[data-index='headerDinamicContent']",
);

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
      headerDinamicContent.addEventListener('click', e => {
        const watchedBtn = document.querySelector('[data-index="watched"]');
        const queueBtn = document.querySelector('[data-index="queue"]');
        if (e.target.textContent === 'WATCHED') {
          queueBtn.classList.remove('current__myLibraryBtn');
          watchedBtn.classList.add('current__myLibraryBtn');
        } else if (e.target.textContent === 'QUEUE') {
          watchedBtn.classList.remove('current__myLibraryBtn');
          queueBtn.classList.add('current__myLibraryBtn');
        }
      });
      changeHistory('mylibrary');
      header.classList.remove('header__background-home');
      header.classList.add('header__background-myLibrary');
      gallery.innerHTML = '';
      homeBtn.classList.remove('current');
      mylibraryBtn.classList.add('current');
    }
  }
};
