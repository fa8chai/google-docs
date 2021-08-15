import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDF1HF_3QSnQTflCWLIXDVEU_ARPn2Ek0c",
    authDomain: "docs-clone-ee9c7.firebaseapp.com",
    projectId: "docs-clone-ee9c7",
    storageBucket: "docs-clone-ee9c7.appspot.com",
    messagingSenderId: "179165835710",
    appId: "1:179165835710:web:979cae11dcd5b4e90009ef",
    measurementId: "G-B69RCYT3B0"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

export { db };