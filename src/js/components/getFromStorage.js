function getFromStorage(filmType) {
  switch (filmType) {
    case 'watched':
      let watched = localStorage.getItem('watched');
      if (watched === null) {
        watched = [];
      } else {
        watched = JSON.parse(watched);
      }
      return watched;
    case 'queue':
      let queue = localStorage.getItem('queue');
      if (queue === null) {
        queue = [];
      } else {
        queue = JSON.parse(queue);
      }
      return queue;
    case 'state':
      let state = localStorage.getItem('state');
      if (state === null) {
        state = {};
      } else {
        state = JSON.parse(state);
      }
      return state;
    default:
      console.log('Write correct type');
  }
}

export default getFromStorage;
