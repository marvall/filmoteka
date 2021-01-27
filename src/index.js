import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';
import MicroModal from 'micromodal';
MicroModal.init();
import modal from './js/modal'
import refs from './js/refs';

refs.galleryItem.addEventListener('click', modal.setModalAttribute);
refs.modalOverlay.addEventListener('click', modal.cleanModalMarkup);
refs.modalCloseButton.addEventListener('click', modal.cleanModalMarkup);

// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
