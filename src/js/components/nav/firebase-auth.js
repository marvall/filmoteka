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

function app(user) {
  // user.displayName
  // user.email
  // user.photoURL
  // user.uid  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  return console.log(user.displayName);
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
      signInBtn.disabled = true;
      signOutBtn.disabled = false;
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          getToken(result);
        })
        .catch(() => {});
    }
  }
  firebase.auth().onAuthStateChanged(newLoginHappend);
}

function loginOut() {
  if (firebase.auth().signOut()) {
    signInBtn.disabled = false;
    signOutBtn.disabled = true;
  }
  firebase.auth().signOut();
}

const signInBtn = document.querySelector('.sing-in');
const signOutBtn = document.querySelector('.sing-out');

signInBtn.addEventListener('click', login);
signOutBtn.addEventListener('click', loginOut);
