import MicroModal from 'micromodal';
MicroModal.init();
const setAttribute = function() {
    let galleryItem = document.querySelector("[data-index='gallery-item']")
    galleryItem.setAttribute("data-micromodal-trigger", "modal-1")
}
galleryItem.addEventListener('click', setAttribute)

// const setMarkup = function () {

// }