/*
  Auxiliary function. Is not exported.
*/
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
  The function accepts only 2 parameters filmObj - object with movie properties
   and filmType - movie type (Only 2 options: 'watched' або 'queue')
  
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
      } else {
        const filtrededWatched = watched.filter(film => {
          return film.id !== filmObj.id;
        });
        localStorage.setItem('watched', JSON.stringify(filtrededWatched));
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
      } else {
        const filtrededQueue = queue.filter(film => {
          return film.id !== filmObj.id;
        });
        localStorage.setItem('queue', JSON.stringify(filtrededQueue));
      }
      break;
    default:
      console.log('Не коректно вказаний data-type');
  }
}

/**
  The function accepts inputText with required 
  @param {text} inputText;
 */
function saveQueryOnStorage(inputText) {
  localStorage.setItem('searchQuery', inputText);
}

export { addToStorage, saveQueryOnStorage };
