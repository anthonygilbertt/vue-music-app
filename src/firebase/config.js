import "firebase/app";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDMEotVZlsyXv2Ha2A9GlbBPErCmgTeK7c",
    authDomain: "vue-music-app-131d5.firebaseapp.com",
    projectId: "vue-music-app-131d5",
    storageBucket: "vue-music-app-131d5.appspot.com",
    messagingSenderId: "224028554952",
    appId: "1:224028554952:web:7f93e46bc33802f4d857fd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }