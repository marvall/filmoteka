import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';

const mainUrl = 'https://api.themoviedb.org/3';
const apiKey = '0a6cfc32872b215b2ba133ea5a8329d8';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const getTrending = async () => {
  return await fetch(
    `${mainUrl}/trending/movie/day?api_key=${apiKey}&media_type=movie`,
  )
    .then(response => response.json())
    .then(json => json.results)
    .then(data => console.log(data))
    .catch(console.log);
};
getTrending();
// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
