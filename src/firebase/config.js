import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMEotVZlsyXv2Ha2A9GlbBPErCmgTeK7c",
    authDomain: "vue-music-app-131d5.firebaseapp.com",
    projectId: "vue-music-app-131d5",
    storageBucket: "vue-music-app-131d5.appspot.com",
    messagingSenderId: "224028554952",
    appId: "1:224028554952:web:7f93e46bc33802f4d857fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firebase.FieldValue.serverTimestamp

export default { projectAuth, projectAuth, timestamp }