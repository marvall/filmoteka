import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCplrPyEZsVNUOOq6dDBimn9JLqurX2GUE',
  authDomain: 'first-team-filmoteka.firebaseapp.com',
  projectId: 'first-team-filmoteka',
  storageBucket: 'first-team-filmoteka.appspot.com',
  messagingSenderId: '352377668166',
  appId: '1:352377668166:web:1a7459d75b0745ef1cc047',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const navStyleContainer = document.querySelector(
  '[data-index="nav__style-container"]',
);

const navAuthLink = document.querySelector('[data-index="nav__auth-link"]');
const navAuthText = document.querySelector('[data-index="nav__auth-text"]');

function app(user) {
  // user.displayName
  // user.email
  // user.photoURL
  // user.uid  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  navAuthLink.innerHTML = '';
  navAuthLink.insertAdjacentHTML(
    'beforeend',
    `<img class="nav__auth-img"src="${user.photoURL}" alt="${user.displayName}"></img>`,
  );
  navAuthText.textContent = 'Sign Out';
}

function getToken(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const token = result.credential.accessToken;
  return token;
}

function login() {
  function newLoginHappend(user) {
    if (user) {
      app(user);
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {})
        .catch(error => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log({ errorCode, errorMessage });
        });
    }
  }
  firebase.auth().onAuthStateChanged(newLoginHappend);
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      navAuthLink.innerHTML = '';
      navAuthLink.insertAdjacentHTML(
        'beforeend',
        `<i class="material-icons auth__icon">person_outline</i>`,
      );
      navAuthText.textContent = 'Sign In';
    });
}

navStyleContainer.addEventListener('click', e => {
  if (e.currentTarget.lastElementChild.textContent === 'Sign In') {
    login();
  }
  if (e.currentTarget.lastElementChild.textContent === 'Sign Out') {
    logout();
  }
});
