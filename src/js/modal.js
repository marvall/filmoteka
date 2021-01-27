//import MicroModal from 'micromodal';
MicroModal.init();
import insideModalMarkup from '../templates/insideModalMarkup.hbs'
import api from './components/api'
import refs from './refs'


const cleanModalMarkup = function () {
    refs.modalContent.innerHTML = ''
}

const updateModalMarkup = function (film) {
    console.log(film)
    refs.modalContent.insertAdjacentHTML('beforeend', insideModalMarkup(film));
    MicroModal.show('modal-1');
}

const setModalAttribute = function (event) {
    refs.galleryItem.setAttribute("data-micromodal-trigger", "modal-1");
    console.log('ololo')
    let localfilmId = event.currentTarget.getElementsByClassName('card')[0].id;
    api.getFilmInfo(localfilmId).then(film =>
    {updateModalMarkup(film)}
    )
}



export default { cleanModalMarkup, setModalAttribute }

// const setMarkup = function () {

// }
// refs.galleryItem.addEventListener('click', updateModalMarkup)