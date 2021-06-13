import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyCy1yn--OW9jSpmV-12PdU6Pvm_dwYfsno",
    authDomain: "santchat-b88bd.firebaseapp.com",
    databaseURL: "https://santchat-b88bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "santchat-b88bd",
    storageBucket: "santchat-b88bd.appspot.com",
    messagingSenderId: "1026046283605",
    appId: "1:1026046283605:web:48cc8e1fcd602828caa9dc",
    measurementId: "G-WP0R5CK55H"
  };
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth;
  export const db = firebase.database();