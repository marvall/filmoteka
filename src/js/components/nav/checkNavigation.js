import { changeHistory } from '../../utils/changeHistory';
import { renderGallery } from '../renderGallery';
import { getFilmsPagination, getFilmInfo, getRenres } from '../api';
// import { reMapFilmsArray } from '../reMapFilmsArray';
import {
  homePageMarkupUpdate,
  myLibraryPageMarkupUpdate,
  headerDinamicContentMarkupUpdate,
  checkClickTarget,
} from './cpaNavLogic';
import { setModalAttribute, showTeam } from '../modal';
import { spinner } from '../spinner';
import initPagination from '../pagination/paginationInit';
import { getSearch } from '../keyWorldSearch';
import initPaginationLS from '../pagination/paginationLS';
import { addToStorage } from '../addToStorage';
import getFromStorage from '../getFromStorage';


const changeStartedPage = function (address) {
  changeHistory(address);
  homePageMarkupUpdate();
  spinner('start');
  getFilmsPagination().then(data => {
    renderGallery(data.results);
    initPagination(data);
    getSearch();
  });
  spinner('stop');
};

export const checkNavigation = function (e) {
  e.preventDefault();
  if (e.type === 'DOMContentLoaded') {
    //Started HOME PAGE
    changeStartedPage('home');
  } else if (e.target !== e.currentTarget) {
    if (checkClickTarget(e)) {
      //Started HOME PAGE
      changeStartedPage('home');
    } else if (e.target.textContent === 'MY LIBRARY') {
      document.querySelector("[data-index='pagination']").innerHTML = '';
      changeHistory('mylibrary');
      myLibraryPageMarkupUpdate();
      headerDinamicContentMarkupUpdate();
      spinner('start');

      // ==============================================================
      //тут должна быть отрисовка моей библиотеки.
      // массив внутри для проверки, его удалить, передать параметром массив с локал сторейджа, этот же массив импортировать в файл paginationLS.js, и записать в переменную results
      initPaginationLS([
        {
          original_language: 'en',
          original_title: 'Outside the Wire',
          poster_path: '/e6SK2CAbO3ENy52UTzP3lv32peC.jpg',
          video: false,
          vote_average: 6.5,
          overview:
            'In the near future, a drone pilot is sent into a deadly militarized zone and must work with an android officer to locate a doomsday device.',
          release_date: '2021-01-15',
          vote_count: 504,
          title: 'Outside the Wire',
          adult: false,
          backdrop_path: '/lOSdUkGQmbAl5JQ3QoHqBZUbZhC.jpg',
          id: 775996,
          genre_ids: [53, 28, 878],
          popularity: 3674.779,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg',
          genre_ids: [10751, 16, 35, 18, 10402, 14],
          original_language: 'en',
          original_title: 'Soul',
          poster_path: '/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg',
          video: false,
          vote_average: 8.3,
          vote_count: 4319,
          overview:
            'Joe Gardner is a middle school teacher with a love for jazz music. After a successful gig at the Half Note Club, he suddenly gets into an accident that separates his soul from his body and is transported to the You Seminar, a center in which souls develop and gain passions before being transported to a newborn child. Joe must enlist help from the other souls-in-training, like 22, a soul who has spent eons in the You Seminar, in order to get back to Earth.',
          release_date: '2020-12-25',
          title: 'Soul',
          id: 508442,
          popularity: 2056.531,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/wmx5vrNH6GEpv4NLACfibZlA1bq.jpg',
          genre_ids: [80, 18],
          vote_count: 115,
          original_language: 'en',
          original_title: 'The White Tiger',
          poster_path: '/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg',
          title: 'The White Tiger',
          video: false,
          vote_average: 6.6,
          release_date: '2021-01-13',
          overview:
            'An ambitious Indian driver uses his wit and cunning to escape from poverty and rise to the top. An epic journey based on the New York Times bestseller.',
          id: 628534,
          popularity: 303.917,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/bblKpucB0XbyQBmfXsaRN985Rgh.jpg',
          genre_ids: [18],
          vote_count: 32,
          original_language: 'en',
          original_title: 'Palmer',
          poster_path: '/xSDdRAjxKAGi8fUBLOqSrBhJmF0.jpg',
          title: 'Palmer',
          video: false,
          vote_average: 8,
          release_date: '2021-01-29',
          overview:
            "After 12 years in prison, former high school football star Eddie Palmer returns home to put his life back together—and forms an unlikely bond with Sam, an outcast boy from a troubled home. But Eddie's past threatens to ruin his new life and family.",
          id: 458220,
          popularity: 76.373,
          media_type: 'movie',
        },
        {
          genre_ids: [18, 36],
          original_language: 'en',
          original_title: 'The Dig',
          poster_path: '/dFDNb9Gk1kyLRcconpj7Mc7C7IL.jpg',
          video: false,
          vote_average: 7.2,
          overview:
            "As WWII looms, a wealthy widow hires an amateur archaeologist to excavate the burial mounds on her estate. When they make a historic discovery, the echoes of Britain's past resonate in the face of its uncertain future‎.",
          id: 532865,
          vote_count: 50,
          title: 'The Dig',
          adult: false,
          backdrop_path: '/gmP41e2bJcFjTzCQFmMoSvfNbxB.jpg',
          release_date: '2021-01-14',
          popularity: 23.502,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
          genre_ids: [28, 53, 878],
          original_language: 'en',
          original_title: 'Tenet',
          poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
          video: false,
          vote_average: 7.3,
          vote_count: 4180,
          overview:
            'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
          release_date: '2020-08-22',
          title: 'Tenet',
          id: 577922,
          popularity: 1117.533,
          media_type: 'movie',
        },
        {
          genre_ids: [28, 12, 18, 37],
          original_language: 'en',
          original_title: 'News of the World',
          poster_path: '/fYQCgVRsQTEfUrP7cW5iAFVYOlh.jpg',
          video: false,
          vote_average: 7.4,
          overview:
            'A Texan traveling across the wild West bringing the news of the world to local townspeople, agrees to help rescue a young girl who was kidnapped.',
          release_date: '2020-12-25',
          vote_count: 177,
          title: 'News of the World',
          adult: false,
          backdrop_path: '/jjPpjUYf3o698cPx06FHZ5zqomv.jpg',
          id: 581032,
          popularity: 77.306,
          media_type: 'movie',
        },
        {
          overview:
            'The film follows two Brooklyn siblings whose summer in a rural Oahu town takes an exciting turn when a journal pointing to long-lost treasure sets them on an adventure, leading them to reconnect with their Hawaiian heritage.',
          release_date: '2021-01-29',
          adult: false,
          backdrop_path: '/yImmxRokQ48PD49ughXdpKTAsAU.jpg',
          genre_ids: [28, 12, 35, 10751],
          vote_count: 17,
          original_language: 'en',
          id: 644092,
          poster_path: '/tTWl37oAYRXS3D5mEHmjveXXyrN.jpg',
          title: "Finding 'Ohana",
          video: false,
          vote_average: 6.7,
          original_title: "Finding 'Ohana",
          popularity: 86.183,
          media_type: 'movie',
        },
        {
          genre_ids: [28, 80, 53],
          original_language: 'es',
          original_title: 'Bajocero',
          poster_path: '/dWSnsAGTfc8U27bWsy2RfwZs0Bs.jpg',
          video: false,
          vote_average: 6.5,
          overview:
            'When a prisoner transfer van is attacked, the cop in charge must fight those inside and outside while dealing with a silent foe: the icy temperatures.',
          id: 587996,
          vote_count: 53,
          title: 'Below Zero',
          adult: false,
          backdrop_path: '/6TPZSJ06OEXeelx1U1VIAt0j9Ry.jpg',
          release_date: '2021-01-29',
          popularity: 84.906,
          media_type: 'movie',
        },
        {
          overview:
            "John Garrity, his estranged wife and their young son embark on a perilous journey to find sanctuary as a planet-killing comet hurtles toward Earth. Amid terrifying accounts of cities getting levelled, the Garrity's experience the best and worst in humanity. As the countdown to the global apocalypse approaches zero, their incredible trek culminates in a desperate and last-minute flight to a possible safe haven.",
          release_date: '2020-07-29',
          adult: false,
          backdrop_path: '/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg',
          title: 'Greenland',
          genre_ids: [28, 53],
          original_language: 'en',
          original_title: 'Greenland',
          poster_path: '/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg',
          vote_count: 1586,
          video: false,
          id: 524047,
          vote_average: 7.1,
          popularity: 588.696,
          media_type: 'movie',
        },
        {
          genre_ids: [16, 28, 12, 80, 14],
          original_language: 'en',
          original_title: 'Batman: Soul of the Dragon',
          poster_path: '/uDhnTtSxU5a8DtZdbbin3aZmkmU.jpg',
          video: false,
          vote_average: 7.2,
          overview:
            'Bruce Wayne faces a deadly menace from his past, with the help of three former classmates: world-renowned martial artists Richard Dragon, Ben Turner and Lady Shiva.',
          id: 732450,
          vote_count: 62,
          title: 'Batman: Soul of the Dragon',
          adult: false,
          backdrop_path: '/jvRewPpawHAfBW38EzHoFdTVEez.jpg',
          release_date: '2021-01-12',
          popularity: 707.078,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/mGJuQwMq1bEboaVTqQAK4p4zQvC.jpg',
          genre_ids: [28, 878],
          vote_count: 0,
          original_language: 'en',
          original_title: 'Godzilla vs. Kong',
          poster_path: '/soM5eNHxxS3a0AqgvDgm2djJXZp.jpg',
          title: 'Godzilla vs. Kong',
          video: false,
          vote_average: 0,
          release_date: '2021-03-25',
          overview:
            'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
          id: 399566,
          popularity: 1737.361,
          media_type: 'movie',
        },
        {
          original_language: 'en',
          original_title: 'One Night in Miami...',
          poster_path: '/rfIOzedY6LFzdWTeNnIkmxAiLCg.jpg',
          video: false,
          vote_average: 7.4,
          overview:
            "In the aftermath of Cassius Clay's defeat of Sonny Liston in 1964, the boxer meets with Malcolm X, Sam Cooke and Jim Brown to change the course of history in the segregated South.",
          release_date: '2020-12-25',
          vote_count: 128,
          title: 'One Night in Miami...',
          adult: false,
          backdrop_path: '/yUyuDacqA0IhWqEbPQPXBsEIbPX.jpg',
          id: 661914,
          genre_ids: [18],
          popularity: 36.887,
          media_type: 'movie',
        },
        {
          original_language: 'en',
          original_title: 'Honest Thief',
          poster_path: '/zeD4PabP6099gpE0STWJrJrCBCs.jpg',
          video: false,
          vote_average: 6.6,
          overview:
            "A bank robber tries to turn himself in because he's falling in love and wants to live an honest life...but when he realizes the Feds are more corrupt than him, he must fight back to clear his name.",
          release_date: '2020-09-03',
          vote_count: 525,
          title: 'Honest Thief',
          adult: false,
          backdrop_path: '/2M2JxEv3HSpjnZWjY9NOdGgfUd.jpg',
          id: 553604,
          genre_ids: [53, 28, 80, 18],
          popularity: 1188.775,
          media_type: 'movie',
        },
        {
          backdrop_path: '/oi0yXLZTkkP7kZbXqf1BODuOD67.jpg',
          genre_ids: [53, 80, 18],
          original_language: 'en',
          original_title: 'Promising Young Woman',
          poster_path: '/73QoFJFmUrJfDG2EynFjNc5gJxk.jpg',
          title: 'Promising Young Woman',
          vote_average: 7.7,
          vote_count: 188,
          overview:
            'A young woman haunted by a tragedy in her past takes revenge on the predatory men unlucky enough to cross her path.',
          release_date: '2020-12-13',
          video: false,
          id: 582014,
          adult: false,
          popularity: 65.956,
          media_type: 'movie',
        },
        {
          adult: false,
          backdrop_path: '/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
          genre_ids: [14, 28, 12],
          vote_count: 3171,
          original_language: 'en',
          original_title: 'Wonder Woman 1984',
          poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
          id: 464052,
          video: false,
          vote_average: 7.1,
          title: 'Wonder Woman 1984',
          overview:
            'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.',
          release_date: '2020-12-16',
          popularity: 2958.722,
          media_type: 'movie',
        },
        {
          original_language: 'en',
          original_title: 'The Little Things',
          poster_path: '/ien08sCofi199G3fkPKNQcDi7jT.jpg',
          video: false,
          vote_average: 6.3,
          overview:
            'Deputy Sheriff Joe "Deke" Deacon joins forces with Sgt. Jim Baxter to search for a serial killer who\'s terrorizing Los Angeles. As they track the culprit, Baxter is unaware that the investigation is dredging up echoes of Deke\'s past, uncovering disturbing secrets that could threaten more than his case.',
          release_date: '2021-01-27',
          vote_count: 46,
          title: 'The Little Things',
          adult: false,
          backdrop_path: '/vfuzELmhBjBTswXj2Vqxnu5ge4g.jpg',
          id: 602269,
          genre_ids: [53, 80],
          popularity: 163.619,
          media_type: 'movie',
        },
        {
          backdrop_path: '/sUcdRh9ya6MtI6nkv8VVlBuBG17.jpg',
          genre_ids: [28, 53],
          original_language: 'en',
          original_title: 'Run Hide Fight',
          poster_path: '/wlP25H14OvKoFORIwuKomZzioA5.jpg',
          title: 'Run Hide Fight',
          vote_average: 0,
          vote_count: 0,
          overview:
            'A 17-year-old girl uses her wits, survival skills, and compassion to fight for her life, and those of her fellow classmates, against a group of live-streaming school shooters.',
          release_date: '2021-03-04',
          video: false,
          id: 629017,
          adult: false,
          popularity: 49.923,
          media_type: 'movie',
        },
        {
          overview:
            "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
          release_date: '2019-04-24',
          adult: false,
          backdrop_path: '/dVSMKPEaiwujXE7kQkvixPLieHR.jpg',
          genre_ids: [12, 878, 28],
          vote_count: 16679,
          original_language: 'en',
          id: 299534,
          poster_path: '/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
          title: 'Avengers: Endgame',
          video: false,
          vote_average: 8.3,
          original_title: 'Avengers: Endgame',
          popularity: 387.355,
          media_type: 'movie',
        },
        {
          overview:
            'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
          release_date: '1977-05-25',
          adult: false,
          backdrop_path: '/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg',
          title: 'Star Wars',
          genre_ids: [12, 28, 878],
          original_language: 'en',
          original_title: 'Star Wars',
          poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
          vote_count: 15041,
          video: false,
          id: 11,
          vote_average: 8.2,
          popularity: 101.332,
          media_type: 'movie',
        },
      ]);
      // ==============================================================

      spinner('stop');
    } else if (e.target.parentNode.dataset.index === 'card') {
      //this func open modal in gallery
      setModalAttribute(e.target.parentNode);
    } else if (e.target.dataset.index === 'team') {
      //this func open modal in footer
      showTeam(e.target);
    } else if (e.target.dataset.index === 'btn-to-wached') {
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'watched');
        },
      );
    } else if (e.target.dataset.index === 'btn-to-queue') {
      getFilmInfo(document.querySelector('[data-index="cardInfo"]').id).then(
        data => {
          addToStorage(data, 'queue');
        },
      );
    } else if (e.target.dataset.index === 'watched') {
      // let slon = getFromStorage('watched');
      // console.log(slon.length);
      renderGallery(getFromStorage('watched'));
      //initPagination({
      //  results: slon,
      //  total_pages: slon.length / 20 + 1,
      //});
    } else if (e.target.dataset.index === 'queue') {
      renderGallery(getFromStorage('queue'));
      //initPagination(getFromStorage('queue'));
    }
  }
};
