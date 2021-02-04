import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig } from './firebaseConfig';
import getFromStorage from '../getFromStorage';

firebase.initializeApp(firebaseConfig);

//============= DATABASE ====================

const db = firebase.database();

const getFromDB = function (data) {
  const user = db.ref(data.userName);
  user.on('value', elem => console.log(elem.val()));
};

const setToDB = function (data) {
  db.ref(data.userName).set({
    watched: getFromStorage('watched'),
    queue: getFromStorage('queue'),
  });
};

//================== AUTH ================

const createToEmailPass = function (data) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .catch(error => console.log(error.message));
};

const loginToEmailPass = function (data) {
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(data => console.log(data.user.uid))
    .catch(error => console.log(error.message));

  //console.log(JSON.stringify(dump));
  // next();

  //  stores,
  //  (store, next) => {
  //    const req = tx.objectStore(store).getAll();
  //    req.onsuccess = () => {
  //      dump[store] = req.result;
  //      next();
  //    };
  //  },
  //  () => {
  //    console.log(JSON.stringify(dump));
  //  },
  //);
};

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
        //ВОТ ГДЕ-ТО Здесть ты должен юзать проверку на авторизацию!
        //ИБО оно асинхронно
        //Если переделаешь проще, ТО ОК!
      });
    };
  };
};
const logout = function () {
  firebase
    .auth()
    .signOut()
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

//const getFromStorage = function (params) {};
export {
  createToEmailPass,
  loginToEmailPass,
  getFromDB,
  setToDB,
  logout,
  magic,
};
