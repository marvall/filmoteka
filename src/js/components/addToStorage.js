function getCurrentStorage() {
  let watched = localStorage.getItem('watched');
  let queue = localStorage.getItem('queue');
  if (watched === null) {
    watched = [];
  } else {
    watched = JSON.parse(watched);
  }
  if (queue === null) {
    queue = [];
  } else {
    queue = JSON.parse(queue);
  }
  return [watched, queue];
}

/**
  Функція приймає event 'click' 
  event listener вішається на спільний контейнер для 2-ох кнопок
  @param {event} event;
 */
function addToStorage(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  const btnContainer = event.currentTarget;
  const { type: btnType, index: filmIndex } = event.target.dataset;
  const [watched, queue] = getCurrentStorage();

  switch (btnType) {
    case 'watched':
      if (!watched.includes(filmIndex)) {
        watched.push(filmIndex);
        const filtrededQueue = queue.filter(id => {
          return id !== filmIndex;
        });

        localStorage.setItem('watched', JSON.stringify(watched));
        localStorage.setItem('queue', JSON.stringify(filtrededQueue));
      }
      break;
    case 'queue':
      if (!queue.includes(filmIndex)) {
        queue.push(filmIndex);
        const filtrededWatched = watched.filter(id => {
          return id !== filmIndex;
        });

        localStorage.setItem('watched', JSON.stringify(filtrededWatched));
        localStorage.setItem('queue', JSON.stringify(queue));
      }
      break;
    default:
      console.log('Не коректно вказаний data-type');
  }

  addDisabledOnBtn(btnContainer);
}

/**
  Функція приймає посилання на DOM Element, який є 
  спільним контейнером для 2-ох кнопок
  @param {DOM Element} btnContainer;
 */
function addDisabledOnBtn(btnContainer) {
  const btnArr = Array.from(btnContainer.querySelectorAll('button'));

  btnArr.map(btn => {
    const { type: btnType, index: filmIndex } = btn.dataset;
    const [watched, queue] = getCurrentStorage();

    switch (btnType) {
      case 'watched':
        if (watched.includes(filmIndex)) {
          btn.setAttribute('disabled', true);
        } else {
          btn.removeAttribute('disabled');
        }
        break;
      case 'queue':
        if (queue.includes(filmIndex)) {
          btn.setAttribute('disabled', true);
        } else {
          btn.removeAttribute('disabled');
        }
        break;
      default:
        console.log('Не коректно вказаний data-type');
    }
  });
}
/**
  Функція приймає event 'submit' 
  event listener вішається на форму із input type="text"
  @param {event} event;
 */
function saveQueryOnStorage(event) {
  event.preventDefault();
  const inputText = event.target[0].value;
  localStorage.setItem('searchQuery', inputText);
}

export { addToStorage, addDisabledOnBtn, saveQueryOnStorage };
