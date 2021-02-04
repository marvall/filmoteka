
import axios from 'axios';
const API_KEY = '4c4fcd40981097a4f391c61f2f249de1';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchVideo = async (movie_id) => {
  const res = await axios.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`);
  return res.data;
}
/**
 * This function returns a link to the official trailer by id ​​from API
 * @param {number} movie_id
 */
async  function getVideoUrl(movie_id) {
  const data = await fetchVideo(movie_id)
    .then(({ results }) => results.map(item => {
      if (item.site === "YouTube") {
         return `https://www.youtube.com/embed/${item.key}`;
        // return `https://www.youtube.com/watch?v=${item.key}`;
      };
    }))
    .catch(err => console.log(err));
   return data[0];
}
  
export { getVideoUrl};
  
