MicroModal.init();
import modalMarkup from '../../templates/modalMarkup.hbs'
import {getFilmInfo} from './api'
import refs from './refs'


const updateModalMarkup = function (film) {
    refs.modalContent.insertAdjacentHTML('beforeend', modalMarkup(film));
    MicroModal.show('modal-1');
}

export function showModal(event) {
    event.currentTarget.setAttribute("data-micromodal-trigger", "modal-1");
    let localfilmId = event.currentTarget.id;
    getFilmInfo(localfilmId).then(film => { updateModalMarkup(film) })
}

// refs.galleryItem.forEach(element => {
//   element.addEventListener('click', showModal)
// });