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
// *and updates markup, taken from modalMarkup.hbs, for a new one.

const updateModalMarkup = function (film) {
  document.querySelector('#modal-1').innerHTML = '';
  document
    .querySelector('#modal-1')
    .insertAdjacentHTML('beforeend', modalMarkup(film));
  MicroModal.show('modal-1');
};

const resetModal = function () {
  console.log('function start');
  document.querySelector('.modal__overlay').addEventListener('click', () => {
    document.querySelector('#modal-1').innerHTML = '';
  });
};

/**
 * You need to pass the node(card of one film) of the element card to this function.
 * @param {Node} event
 * This function opens modal, using function
 * getFilmInfo(accepts film.id from gallery element)
 * adds some styles if needed
 * draws status on btns if needed (checkFilmInStack) and removes attributes from
 * closed modal
 */
export function setModalAttribute(Node) {
  Node.setAttribute('data-micromodal-trigger', 'modal-1');
  spinner('start');
  getFilmInfo(Node.id)
    .then(film => {
      updateModalMarkup(film);

      let title = document.querySelector('.movie-title');
      if (title.textContent.length > 40) {
        title.setAttribute('style', 'font-size: 20px');
      }
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
  Node.removeAttribute('data-micromodal-trigger');
}

/**
 * You need to pass the Node(button Youtube on the card) to this function.
 * @param {Node} event
 */
export function showVideo(Node) {
  Node.setAttribute('data-micromodal-trigger', 'modal-1');
  document.querySelector('#modal-1').innerHTML = '';
  getVideoUrl(Node.dataset.id).then(url => {
    const markup = `<div class="modal__overlay" tabindex="-1" data-micromodal-close>
                  <div class="modal__container video" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                  <div class="movie-tmpl" data-index="modal-video">
                        <iframe src=${url} data-index="iframe" frameborder="0" allow="accelerometer; autoplay; clipboard-write;
                          encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                      </div>
                 </div>
                </div >`;
    document.querySelector('#modal-1').insertAdjacentHTML('beforeend', markup);
    resetModal();
  });
  MicroModal.show('modal-1');
  Node.removeAttribute('data-micromodal-trigger');
}
