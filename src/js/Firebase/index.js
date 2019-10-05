import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDqHPzH6_TBSA1vwajQtB0Xy1YKlFyHZk4",
    authDomain: "pogchatpog.firebaseapp.com",
    databaseURL: "https://pogchatpog.firebaseio.com",
    projectId: "pogchatpog",
    storageBucket: "pogchatpog.appspot.com",
    messagingSenderId: "802583213787",
    appId: "1:802583213787:web:12d3e82ea81a502c6f3efe"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;