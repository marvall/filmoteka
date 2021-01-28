MicroModal.init();
import modalMarkup from '../../templates/modalMarkup.hbs'
import api from './api'
import refs from './refs'


export function updateModalMarkup(film) {
    refs.modalContent.insertAdjacentHTML('beforeend', modalMarkup(film));
    MicroModal.show('modal-1');
}

export function setModalAttribute(event) {
    event.currentTarget.setAttribute("data-micromodal-trigger", "modal-1");
    let localfilmId = event.currentTarget.getElementsByClassName('card')[0].id;
    api.getFilmInfo(localfilmId).then(film => { updateModalMarkup(film) })
}

