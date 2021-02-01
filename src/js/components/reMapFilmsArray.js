import { getFilmsPagination, getRenres } from './api';

export async function reMapFilmsArray(searchValue, pageValue = 1) {
  let genres = await getRenres();
  let massive = await getFilmsPagination(searchValue, pageValue);
  massive.results.map(result => {
    let genresArr = [];

    result.genre_ids.forEach(genreID => {
      genres.forEach(genOBJ => {
        if (genreID === genOBJ.id) {
          genresArr.push(` ${genOBJ.name}`);
        }
      });
    });
    if (genresArr.length > 3) {
      genresArr = genresArr.slice(0, 2);
      genresArr.push(' other..');
    }
    result.genre_ids = genresArr;
  });
  return massive;
}
