import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyAznQbrWu_nwWyesM9or47lasLlC_4Qj0M',
  authDomain: 'crm-for-shipping.firebaseapp.com',
  databaseURL: 'https://crm-for-shipping-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crm-for-shipping',
  storageBucket: 'crm-for-shipping.appspot.com',
  messagingSenderId: '71496632176',
  appId: '1:71496632176:web:5572608eae5f2e9d9631b5'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

