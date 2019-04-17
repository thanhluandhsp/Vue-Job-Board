import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBBlta1yX110aUuwqw5AAb4nUuqDWD3IPc",
    authDomain: "fesherjob.firebaseapp.com",
    databaseURL: "https://fesherjob.firebaseio.com",
    projectId: "fesherjob",
    storageBucket: "fesherjob.appspot.com",
    messagingSenderId: "97360178922"
})

// export const db = firebaseApp.database();