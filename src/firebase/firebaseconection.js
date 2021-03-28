import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyCtKZV5H9d0rX67-4OErgmYIlGo6e-jQk4",
    authDomain: "kenjiapp-c19d4.firebaseapp.com",
    projectId: "kenjiapp-c19d4",
    storageBucket: "kenjiapp-c19d4.appspot.com",
    messagingSenderId: "871709832964",
    appId: "1:871709832964:web:abad3667f5acdb31ff8251"
  };
  

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;