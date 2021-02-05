import firebase from 'firebase/app';
import 'firebase/database';
import { State } from '../../utils/state';
import getFromStorage from '../getFromStorage';
import { resetStorage, addToStorageFromBase } from '../addToStorage';
import { loginGoogle, obFromIndexedDB } from './firebase-auth';
import MicroModal from 'micromodal';

//============= DATABASE ====================

const getFromDB = function (authKey) {
  const db = firebase.database();
  if (!authKey) {
    console.log('not have UID-key for work with firebase');
    return;
  } else {
    const user = db.ref(authKey);
    user.on('value', elem => {
      let data = elem.val();
      if (data) {
        resetStorage();
        addToStorageFromBase(data);
      }
    });
  }
};

const setToDB = function (authKey) {
  const db = firebase.database();
  //if (
  //  getFromStorage('watched').length !== 0 ||
  //  getFromStorage('queue').length !== 0
  //) {
  //  console.log(getFromStorage('watched'));
  //  console.log(getFromStorage('queue'));
  db.ref(authKey).set({
    watched: getFromStorage('watched'),
    queue: getFromStorage('queue'),
  });
  //} else {
  //  db.ref(authKey).set({
  //    watched: 'not watched',
  //    queue: 'not watched',
  //  });
  //}
};

//================== AUTH ================
/**
 * This func not use in this project
 * Create acc with Login and Password
 */
async function createToEmailPass(obj) {
  let login = document.querySelector('[data-index="insertEmail"]').value;
  let pass = document.querySelector('[data-index="insertPassword"]').value;
  const data = await firebase
    .auth()
    .createUserWithEmailAndPassword(obj.email, obj.password)
    .then(data => {
      loginToEmailPass({ email: login, password: pass });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        loginToEmailPass({ email: login, password: pass });
      }
      document.querySelector("[data-index='error_in__auth']").textContent =
        error.message;
    });
  return data;
}

/**
 * This func not use in this project/
 * Login with Login and Password
 */
async function loginToEmailPass(obj) {
  const data = await firebase
    .auth()
    .signInWithEmailAndPassword(obj.email, obj.password)
    .then(data => {
      State.Auth = data.user.uid;
      getFromDB(State.Auth);
      document.querySelector('[data-index="nav__auth-text"]').textContent =
        'Sign Out';
      document
        .querySelector('[data-index="nav__style-container"]')
        .classList.add('loggined');
      MicroModal.close();
    })
    .catch(error => {
      document.querySelector("[data-index='error_in__auth']").textContent =
        error.message;
    });

  return data;
}
/**
 * This func not use in this project
 *The function pulls the authorization object out of indexedDB
 */
const magic = function () {
  const dump = {};
  const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
  dbRequest.onsuccess = () => {
    const localdb = dbRequest.result;
    const stores = ['firebaseLocalStorage'];
    const tx = localdb.transaction(stores);
    const req = tx.objectStore(stores).getAll();
    req.onsuccess = () => {
      dump[stores] = req.result;
      dump[stores].forEach(elem => {});
    };
  };
};

/**
 * This func not use in this project/
 * Function logout acc from this site
 */
const logout = function () {
  firebase
    .auth()
    .signOut()
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

//=====================
const loginEmail = function () {
  let login = document.querySelector('[data-index="insertEmail"]').value;
  let pass = document.querySelector('[data-index="insertPassword"]').value;
  createToEmailPass({ email: login, password: pass });
};

const checkAuth = function () {
  document
    .querySelector("[data-index='signEmail']")
    .addEventListener('click', loginEmail);
  document
    .querySelector("[data-index='signGoogle']")
    .addEventListener('click', loginGoogle);
};

export { getFromDB, setToDB, checkAuth };
