function getFromStorage(filmType) {
  switch (filmIType) {
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
    default:
      console.log('Write correct type');
  }
};

export default getFromStorage;