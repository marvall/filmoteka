import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import { checkNavigation } from './js/components/nav/checkNavigation';
import { loadStartContent } from './js/components/eventToLoad/loadStartContent';
import { renderLoginBtnAfterGetAuthState } from './js/components/firebase/firebase-auth';

renderLoginBtnAfterGetAuthState();

window.addEventListener('DOMContentLoaded', loadStartContent);
window.document
  .querySelector('body')
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". This event is customed, and is not used anywhere.
window.addEventListener('changeHistoryEvent', renderHeader);
