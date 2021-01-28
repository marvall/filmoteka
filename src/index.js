import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import MicroModal from 'micromodal';
import * as modal from './js/components/modal';
import refs from './js/components/refs';


refs.galleryItem.forEach(element => {
  element.addEventListener('click', modal.setModalAttribute )
});


// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
