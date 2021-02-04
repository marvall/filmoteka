import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import { checkNavigation } from './js/components/nav/checkNavigation';
import { loadStartContent } from './js/components/eventToLoad/loadStartContent';
import { renderLoginBtnAfterGetAuthState } from './js/components/firebase/firebase-auth';

import { State } from './js/utils/state';
import { getFromDB, setToDB } from './js/components/firebase/firebaseUtils';

renderLoginBtnAfterGetAuthState();
//setTimeout(() => getFromDB(State.Auth), 3000);

window.addEventListener('DOMContentLoaded', loadStartContent);
window.document
  .querySelector('body')
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". This event is customed, and is not used anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
