import insideModalMarkup from '../templates/insideModalMarkup'
import refs from './refs';
import getFilmInfo from './components/api'



// const updateModalMarkup = function (film) {
//     refs.modalContent.insertAdjacentHTML('beforeend', insideModalMarkup(film));
// }
// refs.galleryItem.addEventListener('click', updateModalMarkup)

// getFilmInfo().then(film => {
//             updateModalMarkup(film);
// })
        
// function onFilmClick(event) {
//     if (event.target.nodeName !== 'IMG') {
//         return;
//     }
//     const image = event.target;
//     const srcImgLightbox = image.dataset.src;
//     showLightbox(srcImgLightbox);
// }