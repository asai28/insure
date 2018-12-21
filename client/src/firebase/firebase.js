import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyANFIILWkLOoRP_CBM-9sv3ZRNOzmF8MHg",
    authDomain: "insurecompliancewebapp.firebaseapp.com",
    databaseURL: "https://insurecompliancewebapp.firebaseio.com",
    projectId: "insurecompliancewebapp",
    storageBucket: "",
    messagingSenderId: "284595278075"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  
  const db = firebase.database();
  const auth = firebase.auth();
  
  export {
    db,
    auth
  };
