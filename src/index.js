import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import { checkNavigation } from './js/components/nav/checkNavigation';
import { loadStartContent } from './js/components/eventToLoad/loadStartContent';

//==============TEST FOR FIREBASE BY MARVALL=================
/*
import db, {
  createToEmailPass,
  loginToEmailPass,
  getFromDB,
  setToDB,
  logout,
  magic,
} from './js/components/firebase/firebaseUtils';

const Yo = {
  email: 'cheburechec@tipa.gnom.ua',
  password: 'slonpelmen',
};

const data = {
  userName: 'cheburechec',
  state: {
    ID: 'ww',
    slon: 'pelmen',
    krot: 'rokoko',
  },
};
//createToEmailPass(Yo);

loginToEmailPass(Yo);
//logout();
//getFromDB(data);
//setToDB(data);
magic();
*/
//========================================

window.addEventListener('DOMContentLoaded', loadStartContent);
window.document
  .querySelector('body')
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". This event is customed, and is not used anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
