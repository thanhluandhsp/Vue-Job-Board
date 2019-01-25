<template>
  <div id="toolbar">
  
    <md-toolbar md-theme="default">
      
        
      <img  src="../../assets/lambda-logo.svg" alt="logo" style="width:25px; margin:5px;">
      
  
      <h2 class="md-title" style="flex: 1; color: white" @click="goToHome">Fresher Jobs</h2>
  
      <router-link tag="md-button" to="/add-job" class="md-rised">
        <md-icon>add</md-icon>
        <span>
          Post Job
        </span>
      </router-link>
  
      <!-- <router-link tag="md-button" to="/profile" class="md-raised" v-if="user"> -->
        <md-avatar style="width:28px;min-width:28px;height:28px;min-height:28px;">
          <img v-if="user" :src="user.photoURL" alt="avatar">
        </md-avatar>
        <!-- <span>{{ user.displayName }}</span> -->
      <!-- </router-link> -->
  
      <md-menu md-size="4" md-direction="bottom left" v-if="user">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="signOut">
            <span>Logout</span>
            <md-icon>phonelink_off</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
  
       <md-button v-if="!user" id="login-button" @click="signInWithGoogle" class="md-button md-raised md-primary">
            <md-icon>account_circle</md-icon> Sign in with Google</md-button>
    </md-toolbar>
  
    
  
  </div>
</template>

<script>
import firebase from 'firebase'
import { firebaseApp } from '@/firebase'
const db = firebaseApp.database();

export default {
  name: 'Toolbar',

  beforeCreate: function () {

    firebaseApp.auth().onAuthStateChanged((user) => {

      

      if (user) {

        this.user = user;
        //debugger;

        let userRef = db.ref("users");

        let userSelf = this.user;

        userRef.once('value', function (snapshot) {
          if (!snapshot.hasChild(userSelf.uid)) {
            userRef.child(userSelf.uid).set({
              id: userSelf.uid,
             pictureUrl: userSelf.photoURL,
              displayName: userSelf.displayName,
              email: userSelf.email,
              disabled: false,
              createdOn: new Date()
            });
          }
        });

        // this.$bindAsArray('items', db.ref(`jobs/${user.uid}`));
      }

      this.loading = false;

    });


  },

  data: function () {
    return {
      email: '',
      password: '',
      loading: true,
      user: null,
      items: [],
      item: '',
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    signInWithGoogle: function () {

      var provider = new firebase.auth.GoogleAuthProvider();
      var that = this; 

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.


        var token = result.credential.accessToken;
        // The signed-in user info.
        that.user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        
        var credential = error.credential;
        // ...
        console.error(error);
      });
    },
    signUpWithPassword() {
      if (this.password === this.confirmPassword) {
        firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(() => this.signInWithPassword())
          .catch((error) => { this.errorMessage = error.message });
      }
    },
    signInWithPassword() {
      return firebase.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userData) => {
          this.onSignedIn();
          return userData;
        })
        .catch((error) => { this.errorMessage = error.message });
    },
    signOut: function () {
      firebaseApp.auth().signOut().then(() => {
        this.user = null;
        this.$router.push('/');
      }).catch(err => console.log(error))
    },
    openDialog(ref) {
      console.log(this.$refs);
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    }
  }
}
</script>