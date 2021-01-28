MicroModal.init();
import footerModalMarkup from '../../templates/modalFooterMarkup.hbs';
import refs from './refs';
import footerGalleryItems from '../../js/components/footerGalleryItems';

export function updateFooterModalMarkup(element) {
  refs.modalContent.insertAdjacentHTML('beforeend', footerModalMarkup(element));
  MicroModal.show('modal-1');
}

// refs.footerLink.addEventListener('click', event => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     footerGalleryItems.query = form.elements.query.value;

//     footerGalleryItems
//         .fetchItems()
//         .then(element => {
//             footerModalMarkup(element);            
//     });
// })