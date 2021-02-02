import getFromStorage from './getFromStorage';
/**
 * This function draws the status on button:
 * added to the movie in some queue or not?
 */
export const checkFilmInStack = function () {
  const check = function (param) {
    let cardID = document.querySelector("[data-index='cardInfo']").id;
    let stack = getFromStorage(param);
    const stackId = stack.map(film => film.id);
    if (stackId.includes(Number(cardID))) {
      return true;
    } else {
      return false;
    }
  };

  let BtnWatched = document.querySelector("[data-index='btn-to-wached']");
  let BtnQueue = document.querySelector("[data-index='btn-to-queue']");

  if (check('watched')) {
    BtnWatched.classList.add('activeBtn');
    BtnWatched.textContent = 'Remove';
  } else if (!check('watched')) {
    BtnWatched.classList.remove('activeBtn');
    BtnWatched.textContent = `ADD TO WATCHED`;
  }
  if (check('queue')) {
    BtnQueue.classList.add('activeBtn');
    BtnQueue.textContent = 'Remove';
  } else if (!check('queue')) {
    BtnQueue.classList.remove('activeBtn');
    BtnQueue.textContent = `ADD TO QUEUE`;
  }
};
