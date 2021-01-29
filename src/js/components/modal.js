
import MicroModal from 'micromodal';
import modalMarkup from '../../templates/modalMarkup.hbs';
import { getFilmInfo } from './api';

MicroModal.init();
const updateModalMarkup = function (film) {
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
  getFilmInfo(Node.id).then(film => {
    updateModalMarkup(film);
  });
}

//  document.querySelectorAll('.card').forEach(element => {
//   element.addEventListener('click', showModal)
// });
