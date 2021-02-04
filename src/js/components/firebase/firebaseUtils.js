import firebase from 'firebase/app';
//import 'firebase/auth';
import 'firebase/database';
//import 'firebase/storage';
import getFromStorage from '../getFromStorage';
import { resetStorage, addToStorageFromBase } from '../addToStorage';

//============= DATABASE ====================

const getFromDB = function (authKey) {
  const db = firebase.database();
  console.log(authKey);
  if (authKey === undefined) {
    console.log('not have UID-key for work with firebase');
    return;
  } else {
    const user = db.ref(authKey);
    user.on('value', elem => {
      let data = elem.val();
      resetStorage();
      console.log(data);
      if (data) {
        addToStorageFromBase(data);
      }
    });
  }
};

const setToDB = function (authKey) {
  console.log(authKey);
  const db = firebase.database();
  db.ref(authKey).set({
    watched: getFromStorage('watched'),
  });
  db.ref(authKey).set({
    queue: getFromStorage('queue'),
  });
};

//================== AUTH ================
/**
 * This func not use in this project
 * Create acc with Login and Password
 */
const createToEmailPass = function (data) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .catch(error => console.log(error.message));
};

/**
 * This func not use in this project/
 * Login with Login and Password
 */
const loginToEmailPass = function (data) {
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(data => console.log(data.user.uid))
    .catch(error => console.log(error.message));
};
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
      dump[stores].forEach(elem => {
        console.log(elem.value.uid);
        //There should be logic for working with authorization
      });
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

export { getFromDB, setToDB };
