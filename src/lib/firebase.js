import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../constants/firebase';

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null'
  && authDomain !== 'null'
  && databaseURL !== 'null'
  && storageBucket !== 'null'
  && messagingSenderId !== 'null'
) {
  firebase.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });

  firebaseInitialized = true;
}

export const Firebase = firebaseInitialized ? firebase : null;
