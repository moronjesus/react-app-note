import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const  firebaseConfig = {

    apiKey: "AIzaSyC1zEHVWU6BFviqSvOW6CFpv1jHNjaxA1o",
    authDomain: "react-app-cursos-6a0af.firebaseapp.com",
    projectId: "react-app-cursos-6a0af",
    storageBucket: "react-app-cursos-6a0af.appspot.com",
    messagingSenderId: "542404311802",
    appId: "1:542404311802:web:6a26734be6c8ac3ebee743"

  };

  firebase.initializeApp(firebaseConfig);

  const db =firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      firebase,
  }