<template>
  <div id="toolbar">
  
    <md-toolbar md-theme="default">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
  
      <h2 class="md-title" style="flex: 1" @click="goToHome">Jobs Portal</h2>
  
      <router-link tag="md-button" to="/add-job" class="md-rised">
        <md-icon>add</md-icon>
        <span>
          Post Job
        </span>
      </router-link>
  
      <router-link tag="md-button" to="/profile" class="md-raised" v-if="user">
        <md-avatar style="width:28px;min-width:28px;height:28px;min-height:28px;">
          <img :src="user.photoURL" alt="avatar">
        </md-avatar>
        <span>{{ user.displayName }}</span>
      </router-link>
  
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
  
      <md-button class="md-raised md-warn" @click="openDialog('login')" v-if="!user">Login</md-button>
    </md-toolbar>
  
    <md-dialog md-open-from="#login" md-close-to="#login" ref="login">
  
      <md-progress md-indeterminate v-if="loading"></md-progress>
  
      <md-dialog-title>Login or Register</md-dialog-title>
  
      <md-dialog-content>
        <template v-if="!user && !loading">
          <md-button @click="signInWithGoogle" class="md-button md-raised md-primary">
            <md-icon>account_circle</md-icon> Sign in with Google</md-button>
        </template>
      </md-dialog-content>
  
      <md-dialog-content>
        <form>
          <md-input-container :class="{'md-input-invalid': errors.has('email')}">
            <label for="email">Email</label>
  
            <md-input v-model="credentials.email" data-vv-name="email" type="email" v-validate name="email" data-vv-rules="required|email"></md-input>
            <span class="md-error">{{errors.first('email')}}</span>
          </md-input-container>
  
          <md-input-container :class="{'md-input-invalid': errors.has('password')}">
            <label for="password">Password</label>
  
            <md-input v-model="credentials.password" data-vv-name="password" type="password" v-validate name="password" data-vv-rules="required|min:5"></md-input>
            <span class="md-error">{{errors.first('password')}}</span>
          </md-input-container>
  
          <md-button class="md-button md-raised md-warn">Login</md-button>
          <md-button class="md-button md-raised md-primary">Register</md-button>
        </form>
      </md-dialog-content>
  
    </md-dialog>
  
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
      const provider = new firebase.auth.GoogleAuthProvider()
      firebaseApp.auth().signInWithRedirect(provider).then((result) => {

        this.user = result.user

      }).catch(err => console.log(error))
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
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    }
  }
}
</script>