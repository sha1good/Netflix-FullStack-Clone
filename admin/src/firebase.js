import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDI3oY7LFdKe4IeStik1aQ0tCWCYuEl4dM",
  authDomain: "netflix-1ea9e.firebaseapp.com",
  projectId: "netflix-1ea9e",
  storageBucket: "netflix-1ea9e.appspot.com",
  messagingSenderId: "122690797529",
  appId: "1:122690797529:web:c0c3851ac92df0d270e3c8",
  measurementId: "G-X1TNT52FN9",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
