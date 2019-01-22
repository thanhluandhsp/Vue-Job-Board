import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCLahv7RvRR4f79yZBX__ZGpRlUHzl5T84",
    authDomain: "lambdademy.firebaseapp.com",
    databaseURL: "https://lambdademy.firebaseio.com",
    projectId: "lambdademy",
    storageBucket: "lambdademy.appspot.com",
    messagingSenderId: "350094766117"
})

// export const db = firebaseApp.database();