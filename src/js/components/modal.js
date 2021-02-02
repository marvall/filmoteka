import MicroModal from 'micromodal';
import modalMarkup from '../../templates/modalMarkup.hbs';
import modalFooter from '../../templates/modalFooter.hbs';
import footerGalleryItem from '../../js/components/footerGalleryItems';
import { getFilmInfo } from './api';
import { spinner } from './spinner';
import { checkFilmInStack } from './checkFimlInStack';

MicroModal.init();
const updateModalMarkup = function (film) {
  document.querySelector('#modal-1').innerHTML = '';
  document
    .querySelector('#modal-1')
    .insertAdjacentHTML('beforeend', modalMarkup(film));
  MicroModal.show('modal-1');
};

/**
 * You need to pass the node(card of one film) of the element card to this function.
 * @param {Node} event
 */
export function setModalAttribute(Node) {
  Node.setAttribute('data-micromodal-trigger', 'modal-1');
  spinner('start');
  getFilmInfo(Node.id)
    .then(film => {
      updateModalMarkup(film);
    })
    .then(() => {
      Node.removeAttribute('data-micromodal-trigger');
      checkFilmInStack();
    });
  spinner('stop');
}
/**
 * You need to pass the node(GO IT LINK) to this function.
 * @param {Node} event
 */
export function showTeam(Node) {
  Node.setAttribute('data-micromodal-trigger', 'modal-1');
  document.querySelector('#modal-1').innerHTML = '';
  document
    .querySelector('#modal-1')
    .insertAdjacentHTML('beforeend', modalFooter(footerGalleryItem));
  MicroModal.show('modal-1');
    Node.removeAttribute('data-micromodal-trigger')
  
}
