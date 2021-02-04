import MicroModal from 'micromodal';
import modalMarkup from '../../templates/modalMarkup.hbs';
import modalFooter from '../../templates/modalFooter.hbs';
import footerGalleryItem from '../../js/components/footerGalleryItems';
import { getFilmInfo } from './api';
import { spinner } from './spinner';
import { checkFilmInStack } from './checkFimlInStack';
import { getVideoUrl } from './getVideoUrl';

MicroModal.init();
// * This function removes markup of the previous modal window,
// *and updates markup for a new one.

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

/**
 * You need to pass the node(button Youtube on the card of one film) to this function.
 * @param {Node} event
 */
export function showVideo(Node) {
  Node.setAttribute('data-micromodal-trigger', 'modal-1');
  getVideoUrl(Node.id).then(url => {
    const markup = `<div class="modal__overlay" tabindex="-1"
                   data-micromodal-close>
                  <div class="modal__container" role="dialog" 
                  aria-modal="true" aria-labelledby="modal-1-title">
                    <main class="modal__content">
                      <div class="movie-tmpl" data-index="modal-video">
                        <iframe width="560" height="315" src=${url} 
                        frameborder="0"
                         allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture"
                         allowfullscreen>
                        </iframe>
                      </div>
                    </main>
                  </div>
                </div >`;
    document.querySelector('#modal-1').innerHTML = '';
    document.querySelector('#modal-1').insertAdjacentHTML('beforeend', markup);
    });
    MicroModal.show('modal-1');
    Node.removeAttribute('data-micromodal-trigger');
  
  
}