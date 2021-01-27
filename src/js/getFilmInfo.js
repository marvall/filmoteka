import insideModalMarkup from '../templates/insideModalMarkup'
import refs from './refs';

const updateModalMarkup = function (film) {
    refs.modalContent.insertAdjacentHTML('beforeend', insideModalMarkup(film));
}
refs.galleryItem.addEventListener('click', updateModalMarkup)

getFilminfo().then(film => {
            updateModalMarkup(film);
        })