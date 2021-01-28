import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import { checkNavigation } from './js/components/nav/checkNavigation';

document
  .querySelector("[data-index='navigation']")
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
