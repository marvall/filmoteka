// this function adds or removes the 'is-visible' class of the film vote element
// example: galleryRef.addEventListener("click",()=>toggleHiden());


export const toggleHiden = function () {
  document.querySelectorAll('.card-info [data-hiden="true"]').forEach(element => element.classList.toggle('is-visible'));
}