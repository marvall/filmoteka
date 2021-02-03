const refs = {
  header: document.querySelector('[data-index="header"]'),
  homeBtn: document.querySelector('[data-index="home"]'),
  mylibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  gallery: document.querySelector('[data-index="gallery"]'),
  headerDinamicContent: document.querySelector(
    "[data-index='headerDinamicContent']",
  ),
};
/**
 * This function change background for page: home
 */
function homePageMarkupUpdate() {
  refs.header.classList.remove('header__background-myLibrary');
  refs.header.classList.add('header__background-home');
  refs.mylibraryBtn.classList.remove('current');
  refs.homeBtn.classList.add('current');
}
/**
 * This function change background for page: myLibrary
 */
function myLibraryPageMarkupUpdate() {
  refs.header.classList.remove('header__background-home');
  refs.header.classList.add('header__background-myLibrary');
  refs.gallery.innerHTML = '';
  refs.homeBtn.classList.remove('current');
  refs.mylibraryBtn.classList.add('current');
}
/**
 * This function render current button in myLibrary
 */
function headerDinamicContentMarkupUpdate() {
  refs.headerDinamicContent.addEventListener('click', e => {
    const watchedBtn = document.querySelector('[data-index="watched"]');
    const queueBtn = document.querySelector('[data-index="queue"]');
    if (e.target.textContent === 'WATCHED') {
      queueBtn.classList.remove('current__myLibraryBtn');
      watchedBtn.classList.add('current__myLibraryBtn');
    } else if (e.target.textContent === 'QUEUE') {
      watchedBtn.classList.remove('current__myLibraryBtn');
      queueBtn.classList.add('current__myLibraryBtn');
    }
  });
}
/**
 * This function check click target in nav menu
 * @param {event} e
 */
function checkClickTarget(e) {
  return (
    e.target.innerText === 'Filmoteka' ||
    e.target.nodeName === 'svg' ||
    e.target.nodeName === 'use' ||
    e.target.textContent === 'HOME'
  );
}

export {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
};
