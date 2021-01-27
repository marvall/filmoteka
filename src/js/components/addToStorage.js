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

function saveQueryOnStorage(event) {
  event.preventDefault();
  const inputText = event.target[0].value;
  localStorage.setItem('searchQuery', inputText);
}

export { addToStorage, addDisabledOnBtn, saveQueryOnStorage };
