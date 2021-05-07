import { firebase } from '@firebase/app'

require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

var firebaseConfig = {
    apiKey: "AIzaSyDlw8-Mt--JzzWW0UywH-OxtRQrvtK9550",
    authDomain: "app-auth-face.firebaseapp.com",
    projectId: "app-auth-face",
    storageBucket: "app-auth-face.appspot.com",
    messagingSenderId: "644701747008",
    appId: "1:644701747008:web:fc0d69046a048531d52ca5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { firebase, db, auth, storage }