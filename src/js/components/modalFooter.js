MicroModal.init();
import footerModalMarkup from '../../templates/modalFooter.hbs';
import footerGalleryItems from '../../js/components/footerGalleryItems';

const footerLink = document.querySelector('.footer-link');


const markupFooter = footerGalleryItems(footerModalMarkup);
footerLink.addEventListener('click', markupFooter);
