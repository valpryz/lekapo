import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA817YeBa5sKmo5QHHUtvw9JL1Kfr20OBk",
  authDomain: "lekaporobert.firebaseapp.com",
  projectId: "lekaporobert",
  storageBucket: "lekaporobert.appspot.com",
  messagingSenderId: "893822433134",
  appId: "1:893822433134:web:07cb2c61633963af3b337f"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }