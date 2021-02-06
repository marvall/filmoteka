import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { saveAuthStateOnStorage } from '../addToStorage';
import getAuthStateFromStorage from '../getFromStorage';
import { State } from '../../utils/state';
import { getFromDB } from './firebaseUtils';
import { showModalAuth } from '../modal';
import MicroModal from 'micromodal';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const navStyleContainer = document.querySelector(
  '[data-index="nav__style-container"]',
);
const navAuthLink = document.querySelector('[data-index="nav__auth-link"]');
const navAuthText = document.querySelector('[data-index="nav__auth-text"]');

export function loginGoogle() {
  MicroModal.close();
  function newLoginHappend(user) {
    if (user) {
      app(user);
      State.Auth = user.uid;
      getFromDB(State.Auth);
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => saveAuthStateOnStorage(true))
        .catch();
    }
  }
  firebase.auth().onAuthStateChanged(newLoginHappend);
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      saveAuthStateOnStorage(false),
      navStyleContainer.classList.remove('loggined'),
      (navAuthLink.innerHTML = ''),
      navAuthLink.insertAdjacentHTML(
        'beforeend',
        `<i class="material-icons auth__icon">person_outline</i>`,
      ),
      (navAuthText.textContent = 'Sign In'),
      (State.Auth = undefined),
    )
    .catch(error => {
      throw error;
    });
}

function app(user) {
  if (user.photoURL) {
    navAuthLink.innerHTML = '';
    navAuthLink.insertAdjacentHTML(
      'beforeend',
      `<img class="nav__auth-img"src="${user.photoURL}"></img>`,
    );
  }
  navAuthText.textContent = 'Sign Out';
}

export function obFromIndexedDB() {
  //fix was finded on :
  //https://coderoad.ru/17468963/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82-%D0%BB%D0%B8-%D0%B1%D0%B0%D0%B7%D0%B0-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-IndexedDB
  function databaseExists(dbname, callback) {
    let req = indexedDB.open(dbname);
    let existed = true;
    req.onsuccess = function () {
      req.result.close();
      if (!existed) indexedDB.deleteDatabase(dbname);
      callback(existed);
    };
    req.onupgradeneeded = function () {
      existed = false;
    };
  }
  databaseExists('firebaseLocalStorageDb', function (yesno) {
    if (yesno) {
      const dump = {};
      const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
      dbRequest.onsuccess = () => {
        const localdb = dbRequest.result;
        if (localdb.objectStoreNames.length === 0) {
          return;
        } else {
          const stores = ['firebaseLocalStorage'];
          const tx = localdb.transaction(stores);
          const req = tx.objectStore(stores).getAll();
          req.onsuccess = () => {
            dump[stores] = req.result;
            dump[stores].forEach(elem => {
              app(elem.value);
              State.Auth = elem.value.uid;
              getFromDB(State.Auth);
            });
          };
        }
      };
    }
  });
}

function renderLoginBtnAfterGetAuthState() {
  if (getAuthStateFromStorage) {
    obFromIndexedDB();
  }
}

navStyleContainer.addEventListener('mouseup', e => {
  if (e.currentTarget.lastElementChild.textContent === 'Sign In') {
    showModalAuth(e.target);
  }
  if (e.target.nodeName === 'IMG' || e.target.textContent === 'Sign Out') {
    logout();
  }
});

export { renderLoginBtnAfterGetAuthState };
