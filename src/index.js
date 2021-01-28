import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import MicroModal from 'micromodal';
import * as modal from './js/components/modal';
import refs from './js/components/refs';
import { checkNavigation } from './js/components/nav/checkNavigation';

refs.galleryItem.forEach(element => {
  element.addEventListener('click', modal.setModalAttribute )
});


document
  .querySelector("[data-index='navigation']")
  .addEventListener('click', checkNavigation);
// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
