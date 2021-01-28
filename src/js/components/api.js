import axios from 'axios';

const API_KEY = '4c4fcd40981097a4f391c61f2f249de1';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function fetchGetTrending(pageValue) {
  const { data } = await axios.get(
    `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`,
  );
  const { results, total_pages, page } = data;
  return { results, total_pages, page };
}

async function fetchGetSearchMovie(valueSearch, pageValue) {
  const { data } = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=${pageValue}&query=${valueSearch}`,
  );
  const { results, total_pages, page } = data;
  return { results, total_pages, page };
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
  return data;
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

export { getFilms, getFilmInfo, getPages, getRenres };
