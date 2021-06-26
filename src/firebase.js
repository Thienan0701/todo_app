import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCQCYn3M-Eg2B9h_lTM5pweqCRC_IZJ9aQ",
    authDomain: "todo-app-cp-9799b.firebaseapp.com",
    projectId: "todo-app-cp-9799b",
    storageBucket: "todo-app-cp-9799b.appspot.com",
    messagingSenderId: "858275027352",
    appId: "1:858275027352:web:a6d7e0f17275f06b44b3ed",
    measurementId: "G-MMESQ6WDD6"
});

const db = firebaseApp.firestore();

export default db;