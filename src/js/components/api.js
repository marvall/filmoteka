import axios from 'axios';
// import { reMapFilmsArray } from './reMapFilmsArray'; //
const API_KEY = '4c4fcd40981097a4f391c61f2f249de1';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function fetchGetTrending(pageValue) {
  const { data } = await axios.get(
    `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`,
  );
  const { results, total_pages, page, total_results } = data;
  return { results, total_pages, page, total_results };
}

async function fetchGetSearchMovie(valueSearch, pageValue) {
  const { data } = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=${pageValue}&query=${valueSearch}`,
  );
  const { results, total_pages, page, total_results } = data;
  return { results, total_pages, page, total_results };
}
async function fetchGetMovieById(id) {
  const { data } = await axios.get(`/movie/${id}?api_key=${API_KEY}`);

  return data;
}

async function fetchGetMovieGenres() {
  const { data } = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
  const { genres } = data;
  return genres;
}
//===========================================//
async function getFilms(searchValue, pageValue = 1) {
  if (!searchValue) {
    const data = await fetchGetTrending(pageValue)
      .then(({ results }) => results)
      .catch(err => console.log(err));
    return data;
  }

  if (searchValue) {
    const data = await fetchGetSearchMovie(searchValue, pageValue)
      .then(({ results }) => results)
      .catch(err => console.log(err));
    return data;
  }
}

async function getFilmInfo(filmId) {
  const data = await fetchGetMovieById(filmId).catch(err => console.log(err));
  return reMapFilm(data);
}

async function getPages(searchValue, pageValue = 1) {
  if (!searchValue) {
    const data = await fetchGetTrending(pageValue)
      .then(({ total_pages }) => total_pages)
      .catch(err => console.log(err));
    return data;
  }

  if (searchValue) {
    const data = await fetchGetSearchMovie(searchValue, pageValue)
      .then(({ total_pages }) => total_pages)
      .catch(err => console.log(err));
    return data;
  }
}

async function getRenres() {
  const data = await fetchGetMovieGenres().catch(err => console.log(err));
  return data;
}

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
async function reMapFilmsArray(array) {
  let genres = await getRenres();
  array.results.map(result => {
    let releaseYear = '';
    releaseYear = result.release_date.slice(0, 4);

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
function reMapFilm(arrayGenres) {
  // let releaseYear = '';
  // releaseYear = arrayGenres.release_date.slice(0, 4);
  let genresArr = [];
  arrayGenres.genres.map(genres => {
    genresArr.push(` ${genres.name}`);
  });

  // if (genresArr.length > 3) {
  //   genresArr = genresArr.slice(0, 2);
  //   genresArr.push(' other..');
  // }
  arrayGenres.genres = genresArr;
  // arrayGenres.release_date = releaseYear;
  return arrayGenres;
}
export { getFilms, getFilmInfo, getPages, getRenres, getFilmsPagination };
