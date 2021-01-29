import MicroModal from 'micromodal';
import modalMarkup from '../../templates/modalMarkup.hbs';
import modalFooter from '../../templates/modalFooter.hbs';
import { getFilmInfo } from './api';
import { spinner } from './spinner';

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
  spinner.show();
  getFilmInfo(Node.id)
    .then(film => {
      updateModalMarkup(film);
    })
    .then(Node.removeAttribute('data-micromodal-trigger'));
  setTimeout(() => {
    spinner.hide();
  }, 500);
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
    .insertAdjacentHTML('beforeend', modalFooter());
  MicroModal.show('modal-1').then(
    Node.removeAttribute('data-micromodal-trigger'),
  );
}
