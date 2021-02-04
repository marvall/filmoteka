import getFromStorage from '../getFromStorage';
import initPaginationLS from './paginationLS';

const mediaQueryList = [
  window.matchMedia('(max-width: 767px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
  window.matchMedia('(min-width: 1024px)'),
];

mediaQuerySetup();

/**
 * this function returns the number of elements on the
 * page at different viewport sizes according to the layout
 */
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

/**
 * this function checks on which tab the user is 
 * when changing the viewport
 * and initializes markup pagination for it
 */
function mediaQuerySetup() {
  // const buttonHome = document.querySelector('[data-index="home"]');
  const buttonLibrary = document.querySelector('[data-index="mylibrary"]');

  const resultsQueue = getFromStorage('queue');
  const resultsWatched = getFromStorage('watched');

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
}
