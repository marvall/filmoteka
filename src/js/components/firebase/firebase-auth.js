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
      //app(user);
      obFromIndexedDB();
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
  navAuthLink.innerHTML = '';
  navAuthLink.insertAdjacentHTML(
    'beforeend',
    `<img class="nav__auth-img"src="${user.photoURL}"></img>`,
  );
  navAuthText.textContent = 'Sign Out';
}

export function obFromIndexedDB() {
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
        State.Auth = elem.value.uid;
        getFromDB(State.Auth);
      });
    };
  };
}

function renderLoginBtnAfterGetAuthState() {
  if (getAuthStateFromStorage) {
    obFromIndexedDB();
  }
}

navStyleContainer.addEventListener('mouseup', e => {
  if (e.currentTarget.lastElementChild.textContent === 'Sign In') {
    //login();
    showModalAuth(e.target);
  }
  if (e.target.nodeName === 'IMG' || e.target.textContent === 'Sign Out') {
    logout();
  }
});

export { renderLoginBtnAfterGetAuthState };
