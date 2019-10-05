import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAUS8ggvWgvgU0HicePACkBtTg2bFRHYX4",
  authDomain: "pogchess.firebaseapp.com",
  databaseURL: "https://pogchess.firebaseio.com",
  projectId: "pogchess",
  storageBucket: "pogchess.appspot.com",
  messagingSenderId: "546656074676",
  appId: "1:546656074676:web:859da2bdbb9b91464890e1",
  measurementId: "G-TPNGFYMBE0"
};
firebase.initializeApp(firebaseConfig);

export default firebase;