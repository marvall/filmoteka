//  Пока закоментил, так как при динамическом рендере выдаёт ошибку

// import { getFilms } from './api';
// import { renderGallery } from './renderGallery';
// const _ = require('lodash');

// const refs = {
//   searchForm: document.querySelector('[data-index="serchInfo"]'),
//   fetchStatus: document.querySelector('[data-index="fetchStatus"]'),
// };

// refs.searchForm.addEventListener(
//   'input',
//   _.debounce(e => {
//     e.preventDefault();
//     getFilms(e.target.value).then(data => renderGallery(data));
//   }, 1250),
// );
