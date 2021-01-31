import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import { checkNavigation } from './js/components/nav/checkNavigation';
import { loadStartContent } from './js/components/eventToLoad/loadStartContent';

window.addEventListener('DOMContentLoaded', loadStartContent);
window.document
  .querySelector('body')
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);

//================arrowTop для проверки======//
import arrowTop from './js/components/arrowTop'; // при подключении в index.js
arrowTop(); //для проверки
