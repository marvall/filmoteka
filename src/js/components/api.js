import axios from 'axios';

const API_KEY = '4c4fcd40981097a4f391c61f2f249de1';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
/**
 * Auxiliary function. Is not exported.
 */
async function fetchGetTrending(pageValue) {
  const { data } = await axios.get(
    `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`,
  );
  const { results, total_pages, page, total_results } = data;
  return { results, total_pages, page, total_results };
}
/**
 * Auxiliary function. Is not exported.
 */
async function fetchGetSearchMovie(valueSearch, pageValue) {
  const { data } = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=${pageValue}&query=${valueSearch}`,
  );
  const { results, total_pages, page, total_results } = data;
  return { results, total_pages, page, total_results };
}
/**
 * Auxiliary function. Is not exported.
 */
async function fetchGetMovieById(id) {
  const { data } = await axios.get(`/movie/${id}?api_key=${API_KEY}`);

  return data;
}
/**
 * Auxiliary function. Is not exported.
 */
async function fetchGetMovieGenres() {
  const { data } = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
  const { genres } = data;
  return genres;
}

// async function getFilms(searchValue, pageValue = 1) {
//   if (!searchValue) {
//     const data = await fetchGetTrending(pageValue)
//       .then(({ results }) => results)
//       .catch(err => console.log(err));
//     return data;
//   }

//   if (searchValue) {
//     const data = await fetchGetSearchMovie(searchValue, pageValue)
//       .then(({ results }) => results)
//       .catch(err => console.log(err));
//     return data;
//   }
// }
/**
 * This function get the primary information about a movie from API,
 * filmId takes current id movie
 * @param {number} filmId
 */
async function getFilmInfo(filmId) {
  const data = await fetchGetMovieById(filmId).catch(err => console.log(err));
  return reMapFilm(data);
}
/**
 * This function get the primary information about a movie from Local Storage,
 * filmId takes current id movie
 * @param {number} filmId
 */
async function getFilmInfoToStorage(filmId) {
  const data = await fetchGetMovieById(filmId).catch(err => console.log(err));
  return reMapFilmToStorage(data);
}

// async function getPages(searchValue, pageValue = 1) {
//   if (!searchValue) {
//     const data = await fetchGetTrending(pageValue)
//       .then(({ total_pages }) => total_pages)
//       .catch(err => console.log(err));
//     return data;
//   }
//   if (searchValue) {
//     const data = await fetchGetSearchMovie(searchValue, pageValue)
//       .then(({ total_pages }) => total_pages)
//       .catch(err => console.log(err));
//     return data;
//   }
// }
/**
 * This function get the information about renres a movie from API,
 * filmId takes current id movie
 */
async function getRenres() {
  const data = await fetchGetMovieGenres().catch(err => console.log(err));
  return data;
}
/**
 * This function get movie (trending or query search),
 * searchValue takes dynamic search value
 * pageValue takes dynamic page value
 * @param {string} searchValue
 * @param {number} pageValue
 */
async function getFilmsPagination(searchValue, pageValue = 1) {
  if (!searchValue) {
    const data = await fetchGetTrending(pageValue).catch(err =>
      console.log(err),
    );
    return reMapFilmsArray(data);
  }

  if (searchValue) {
    const data = await fetchGetSearchMovie(searchValue, pageValue).catch(err =>
      console.log(err),
    );
    return reMapFilmsArray(data);
  }
}
/**
 * Auxiliary function. Is not exported.
 */
async function reMapFilmsArray(array) {
  let genres = await getRenres();
  array.results.map(result => {
    let releaseYear = '';
    if (!result.release_date) {
      releaseYear = '';
    } else {
      releaseYear = result.release_date.slice(0, 4);
    }
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
    result.release_date = releaseYear;
  });
  return array;
}
/**
 * Auxiliary function. Is not exported.
 */
function reMapFilm(arrayGenres) {
  let releaseYear = '';
  if (!arrayGenres.release_date) {
    releaseYear = '';
  } else {
    releaseYear = arrayGenres.release_date.slice(0, 4);
  }
  let genresArr = [];
  arrayGenres.genres.map(genres => {
    genresArr.push(` ${genres.name}`);
  });
  arrayGenres.genres = genresArr;
  arrayGenres.release_date = releaseYear;
  return arrayGenres;
}
/**
 * Auxiliary function. Is not exported.
 */
function reMapFilmToStorage(arrayGenres) {
  let releaseYear = '';
  if (!arrayGenres.release_date) {
    releaseYear = '';
  } else {
    releaseYear = arrayGenres.release_date.slice(0, 4);
  }
  let genresArr = [];
  arrayGenres.genres.map(genres => {
    genresArr.push(` ${genres.name}`);
  });

  if (genresArr.length > 3) {
    genresArr = genresArr.slice(0, 2);
    genresArr.push(' other..');
  }
  arrayGenres.genres = genresArr;
  arrayGenres.release_date = releaseYear;
  return arrayGenres;
}

export {
  // getFilms,
  getFilmInfo,
  // getPages,
  getRenres,
  getFilmsPagination,
  getFilmInfoToStorage,
};
