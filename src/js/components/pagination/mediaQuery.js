import getFromStorage from '../getFromStorage';
import initPaginationLS from './paginationLS';

// const buttonHome = document.querySelector('[data-index="home"]');
const buttonLibrary = document.querySelector('[data-index="mylibrary"]');

const mediaQueryList = [
  window.matchMedia('(max-width: 767px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
  window.matchMedia('(min-width: 1024px)'),
];

const resultsQueue = getFromStorage('queue');
const resultsWatched = getFromStorage('watched');

export function paginationSizeChanger() {
  if (mediaQueryList[0].matches) {
    return 4;
  }
  if (mediaQueryList[1].matches) {
    return 8;
  }
  if (mediaQueryList[2].matches) {
    return 9;
  }
}

mediaQueryList.forEach(mediaQuery =>
  mediaQuery.addEventListener('change', () => {
    // if (buttonHome.classList.contains('current')) {
    // }
    if (buttonLibrary.classList.contains('current')) {
      const buttonWatched = document.querySelector('[data-index="watched"]');
      const buttonQueue = document.querySelector('[data-index="queue"]');

      if (buttonWatched.classList.contains('current__myLibraryBtn')) {
        initPaginationLS(resultsWatched);
      }
      if (buttonQueue.classList.contains('current__myLibraryBtn')) {
        initPaginationLS(resultsQueue);
      }
    }
  }),
);
