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
  Функція приймає два параметра filmObj - обєкт із властивостями фільму
   і filmType - тип фільму (Тільки 2 варіанти: 'watched' або 'queue')
  
  @param {objects} filmObj;
  @param {string} filmType;
 */
function addToStorage(filmObj, filmType) {
  const [watched, queue] = getCurrentStorage();
  const watchedId = watched.map(film => film.id);
  const queueId = queue.map(film => film.id);

  switch (filmType) {
    case 'watched':
      if (!watchedId.includes(filmObj.id)) {
        watched.push(filmObj);
        const filtrededQueue = queue.filter(film => {
          return film.id !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(watched));
        localStorage.setItem('queue', JSON.stringify(filtrededQueue));
      }
      break;
    case 'queue':
      if (!queueId.includes(filmObj.id)) {
        queue.push(filmObj);
        const filtrededWatched = watched.filter(film => {
          return film.id !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(filtrededWatched));
        localStorage.setItem('queue', JSON.stringify(queue));
      }
      break;
    default:
      console.log('Не коректно вказаний data-type');
  }
}

/**
  Функція приймає inputText із необхідним 
  @param {text} inputText;
 */
function saveQueryOnStorage(inputText) {
  localStorage.setItem('searchQuery', inputText);
}

export { addToStorage, saveQueryOnStorage };
