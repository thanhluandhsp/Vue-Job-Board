import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4qaG21Oz4Fw9DTYMhr_21l93EcM7Dj6o",
    authDomain: "barodajobs-483b0.firebaseapp.com",
    databaseURL: "https://barodajobs-483b0.firebaseio.com",
    projectId: "barodajobs-483b0",
    storageBucket: "barodajobs-483b0.appspot.com",
    messagingSenderId: "23437819094"
})

// export const db = firebaseApp.database();