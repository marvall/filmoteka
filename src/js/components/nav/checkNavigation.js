import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination, getFilmInfo } from '../api';
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
import initPaginationLS from '../pagination/paginationLS';
import { addToStorage } from '../addToStorage';
import getFromStorage from '../getFromStorage';

/**
 * This function render started-page: home.
 */
const changeStartedPage = function () {
  changeHistory('home');
  homePageMarkupUpdate();
  spinner('start');
  getFilmsPagination().then(data => {
    renderGallery(data.results);
    initPagination(data);
    getSearch();
  });
  spinner('stop');
};

const chechFilmInStack = function (e) {
  //console.log(e.target.dataset.index);
  //if (
  //  e.target.dataset.index === 'btn-to-wached' ||
  //  e.target.dataset.index === 'btn-to-queue'
  //) {
  //  let stackName = e.target.dataset.index;
  //  console.log(stackName);
  //  if (stackName === 'btn-to-wached') {
  //    stackName = 'watched';
  //    console.log(stackName);
  //  }
  //  if (stackName === 'btn-to-queue') {
  //    stackName = 'queue';
  //    console.log(stackName);
  //  }
  //
  //  let stack = getFromStorage(stackName);
  //
  //  const stackId = stack.map(film => film.id);
  //  let cardID = document.querySelector("[data-index='cardInfo']");
  //
  //  let BtnWatched = document.querySelector("[data-index='btn-to-wached']");
  //  let BtnQueue = document.querySelector("[data-index='btn-to-queue']");
  //
  //  if (stackId.includes(Number(cardID.id))) {
  //    e.target.classList.add('activeBtn');
  //    e.target.textContent = 'Remove';
  //  } else {
  //    e.target.classList.remove('activeBtn');
  //    e.target.textContent = `ADD TO ${stackName.toUpperCase()}`;
  //  }
  //}
};

/**
 * This Function expects events. The Func handles clicks on all interfaces,
 * navigates or calls the desired stack of actions for a specific element.
 * @param {event} e
 */
export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.type === 'DOMContentLoaded') {
    //Started HOME PAGE
    changeStartedPage();
  } else if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      //Started HOME PAGE
      changeStartedPage();
    } else if (e.target.textContent === 'MY LIBRARY') {
      document.querySelector("[data-index='pagination']").innerHTML = '';
      //Started MYLIBRARY PAGE
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
    } else if (e.target.parentNode.dataset.index === 'card') {
      //THIS FUNC OPEN MODLA IN GALLERY
      setModalAttribute(e.target.parentNode);
      chechFilmInStack(e);
    } else if (e.target.dataset.index === 'team') {
      //THIS FUNC OPEN MODLA IN FOOTER
      showTeam(e.target);
    } else if (e.target.dataset.index === 'btn-to-wached') {
      //ADD TO WATCHED
      chechFilmInStack(e);
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'watched');
        },
      );
    } else if (e.target.dataset.index === 'btn-to-queue') {
      //ADD TO QUEUE
      chechFilmInStack(e);
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'queue');
        },
      );
    } else if (e.target.dataset.index === 'watched') {
      //RENDER STACK WATCHED
      initPaginationLS(getFromStorage('watched'));
    } else if (e.target.dataset.index === 'queue') {
      //RENDER STACK QUEUE
      initPaginationLS(getFromStorage('queue'));
    }
  }
};
