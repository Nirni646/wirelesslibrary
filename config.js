import * as firebase from "firebase";
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyB5CJTm5JiyGwqlV817BduaVBwhkGA-u0Q",
    authDomain: "wireleibrary-d35eb.firebaseapp.com",
    databaseURL: "https://wireleibrary-d35eb-default-rtdb.firebaseio.com",
    projectId: "wireleibrary-d35eb",
    storageBucket: "wireleibrary-d35eb.appspot.com",
    messagingSenderId: "676812928086",
    appId: "1:676812928086:web:1d680fc251c8dab46d77f7",
    measurementId: "G-QR4608EDWC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();