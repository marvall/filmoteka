import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { saveAuthStateOnStorage } from '../addToStorage';
import getAuthStateFromStorage from '../getFromStorage';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const navStyleContainer = document.querySelector(
  '[data-index="nav__style-container"]',
);
const navAuthLink = document.querySelector('[data-index="nav__auth-link"]');
const navAuthText = document.querySelector('[data-index="nav__auth-text"]');

function login() {
  function newLoginHappend(user) {
    if (user) {
      app(user);
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
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
      (navAuthLink.innerHTML = ''),
      navAuthLink.insertAdjacentHTML(
        'beforeend',
        `<i class="material-icons auth__icon">person_outline</i>`,
      ),
      (navAuthText.textContent = 'Sign In').catch(error => {
        throw error;
      }),
    );
}

function app(user) {
  navAuthLink.innerHTML = '';
  navAuthLink.insertAdjacentHTML(
    'beforeend',
    `<img class="nav__auth-img"src="${user.photoURL}" alt="${user.displayName}"></img>`,
  );
  navAuthText.textContent = 'Sign Out';
}

function obFromIndexedDB() {
  const dump = {};
  const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
  dbRequest.onsuccess = () => {
    const localdb = dbRequest.result;
    const stores = ['firebaseLocalStorage'];
    const tx = localdb.transaction(stores);
    const req = tx.objectStore(stores).getAll();
    req.onsuccess = () => {
      dump[stores] = req.result;
      dump[stores].forEach(elem => {
        app(elem.value);
      });
    };
  };
}

function renderLoginBtnAfterGetAuthState() {
  if (getAuthStateFromStorage) {
    obFromIndexedDB();
  }
}

navStyleContainer.addEventListener('click', e => {
  if (e.currentTarget.lastElementChild.textContent === 'Sign In') {
    login();
  }
  if (e.target.nodeName === 'IMG' || e.target.textContent === 'Sign Out') {
    logout();
  }
});

export { renderLoginBtnAfterGetAuthState };
