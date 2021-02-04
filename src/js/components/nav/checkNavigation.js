import { changeHistory } from '../../utils/changeHistory';
import { State } from '../../utils/state';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination, getFilmInfoToStorage } from '../api';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute, showTeam, showVideo } from '../modal';
import { spinner } from '../spinner';
import initPagination from '../pagination/paginationInit';
import { getSearch } from '../keyWorldSearch';
import initPaginationLS from '../pagination/paginationLS';
import { addToStorage } from '../addToStorage';
import getFromStorage from '../getFromStorage';
import { checkFilmInStack } from '../checkFimlInStack';

/**
 * This function render started-page from localStorage or localState (class State);
 */
const changeStartedPage = function () {
  if (State.Page === 'home') {
    startHome();
  } else if (State.Page === 'mylibrary') {
    startMyLibrary();
  }
};

/**
 * This function render page: Home
 */
const startHome = function () {
  homePageMarkupUpdate();
  changeHistory('home');
  spinner('start');
  getFilmsPagination().then(data => {
    renderGallery(data.results);
    initPagination(data);
    getSearch();
  });
  spinner('stop');
};

/**
 * This function render page: myLibrary
 */
const startMyLibrary = function () {
  document.querySelector("[data-index='pagination']").innerHTML = '';
  changeHistory('mylibrary');
  myLibraryPageMarkupUpdate();
  headerDinamicContentMarkupUpdate();
  document
    .querySelector('[data-index="watched"]')
    .classList.add('current__myLibraryBtn');
  spinner('start');
  //RENDER STACK WATCHED
  initPaginationLS(getFromStorage('watched'));
  spinner('stop');
};

/**
 * This Function expects events. The Func handles clicks on all interfaces,
 * navigates or calls the desired stack of actions for a specific element.
 * @param {event} e
 */
export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.target.localName === 'a') {
    if (e.target.parentNode.dataset.num) {
      return;
    }
  }
  if (e.type === 'DOMContentLoaded') {
    //Started LAST PAGE
    changeStartedPage();
  }
  else if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      //Started HOME PAGE
      startHome();
    } else if (e.target.textContent === 'MY LIBRARY') {
      //Started MYLIBRARY PAGE
      startMyLibrary(); //-small
    } else if (
      e.target.parentNode.dataset.index === 'card' ||
      e.target.parentNode.dataset.index === 'card-small'
    ) {
      //THIS FUNC OPEN MODLA IN GALLERY
      setModalAttribute(e.target.parentNode);
    } else if (e.target.dataset.index === 'team') {
      //THIS FUNC OPEN MODAL IN FOOTER
      showTeam(e.target);
    } else if (e.target.dataset.index === 'btn-to-wached') {
      //ADD TO WATCHED
      checkFilmInStack();
      getFilmInfoToStorage(
        document.querySelector('[data-index="cardInfo"]').id,
      ).then(data => {
        addToStorage(data, 'watched');
        checkFilmInStack();
      });
    } else if (e.target.dataset.index === 'btn-to-queue') {
      //ADD TO QUEUE
      checkFilmInStack();
      getFilmInfoToStorage(
        document.querySelector('[data-index="cardInfo"]').id,
      ).then(data => {
        addToStorage(data, 'queue');
        checkFilmInStack();
      });
    } else if (e.target.dataset.index === 'watched') {
      //RENDER STACK WATCHED
      initPaginationLS(getFromStorage('watched'));
    } else if (e.target.dataset.index === 'queue') {
      //RENDER STACK QUEUE
      initPaginationLS(getFromStorage('queue'));
    } else if (e.target.dataset.index === 'btn-youtube') {
      // OPEN MODAL with official trailer 
    showVideo(e.target);}
  } 
};
