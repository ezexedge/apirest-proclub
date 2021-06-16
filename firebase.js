const firebase = require('firebase/app')
require('firebase/auth')
require('@firebase/messaging')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNHMaLDTWgvQYzpAcrEXSwKDNAWllFm_A",
  authDomain: "proclub-f20ff.firebaseapp.com",
  projectId: "proclub-f20ff",
  storageBucket: "proclub-f20ff.appspot.com",
  messagingSenderId: "553960707025",
  appId: "1:553960707025:web:d46b3e2c909dece3b746f0"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

module.exports = firebase
