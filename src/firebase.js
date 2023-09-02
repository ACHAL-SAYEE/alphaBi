import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  // Have the firebase config here
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   //   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: 'AIzaSyDJYarUj02Flo29xT4hlXm9ErHJvbIVgmY',
  authDomain: 'alphabi-854d1.firebaseapp.com',
  projectId: 'alphabi-854d1',
  storageBucket: 'alphabi-854d1.appspot.com',
  messagingSenderId: '1043774547610',
  appId: '1:1043774547610:web:b6f76f1b6a8d62f0106123',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {auth, db}
