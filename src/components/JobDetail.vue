<template>
  <md-layout>


    <md-card md-with-hover  v-if="job">
    
  
      <md-card-header>
     
          
            <h2 >{{ job.jobtitle }}</h2>
      </md-card-header>
      

      <md-card-content>

          <div class="md-body-2" style="">
            
            <span class="md-headline md-primary">{{ job.company }}</span>
            <hr>
            <div class="md-body-1">
              <span style="margin-right: 10px">
              Posted <md-icon>access_time</md-icon>
              
              <time-ago  :datetime="job.created_at" long></time-ago>  <md-icon style="padding: 0px;margin:0 0 0 15px;">place</md-icon> {{ job.location }}

              </span>
              
            </div>


            <div class="md-body-2">
              <h3>Job Description</h3>
                <vue-markdown>{{ job.description }}</vue-markdown>
            </div>

            
            <div class="md-body-2" v-if="job.why">
              <h3>Why join us</h3>
                <vue-markdown>{{ job.why }}</vue-markdown>
            </div>

            
            <div class="md-body-2" v-if="job.benefits">
              <h3>Benefits</h3>  <vue-markdown>{{ job.benefits }}</vue-markdown>
            </div>

              
            <div class="md-body-2" v-if="job.responsibilities">
              <h3>Responsibilities</h3>
               <vue-markdown>{{ job.responsibilities }}</vue-markdown>
            </div>

              
            <div class="md-body-2" v-if="job.skills">
              <h3>Your Skills and Experience</h3>
                <vue-markdown>{{ job.skills }}
                </vue-markdown>

            </div>

            <div class="md-body-2" v-if="thisUser">
              <h3>Contact</h3>
                <ul>
                  <li v-if="job.website">
                    Website: <a :href="job.website">{{ job.website }}</a>
                  </li>
                  <li v-if="job.phone">
                    Phone: {{ job.phone}}
                  </li>
                  <li v-if="job.email">
                    Email: {{ job.email}}
                  </li>
                  <li v-if="job.skype">
                    Skype: {{ job.skype}}
                  </li>
                  <li v-if="job.how">
                    How to apply: {{ job.how}}
                  </li>
                </ul>
                

            </div>




            <br>

            <md-button class="md-button md-accent md-raised" @click="signInWithGoogle"  v-if="!thisUser">Apply Now</md-button>

          </div>
      
      
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import { firebaseApp } from '@/firebase'
const db = firebaseApp.database();
import { BulletListLoader } from 'vue-content-loader'
import TimeAgo from 'vue2-timeago'
import VueMarkdown from 'vue-markdown'
import store from '../store'

import firebase from 'firebase'



export default {
  name: 'JobDetail',
  props: ['_key'],
  components: {
    BulletListLoader,
    TimeAgo,
    VueMarkdown


  },

  data: function () {
    return {
      loading: true,
      job: null,
      thisUser: null
    }
  },
 
  mounted() {
    
    this.getJob();
    var that = this;

    
    firebase.auth().onAuthStateChanged(function(user) {
    
      if (user) {
           that.thisUser =  user;

      } else {
          store.state.userLogedIn = false
          store.state.thisUser = null
      }
    });
    
   
  },
  methods: {
    getJob() {
      var that = this;
      
        
      db.ref('/jobs/' +  this._key)

        .on('value',function(snapshot) {
          
          that.job = snapshot.val();
          that.loading = false;
        
      });

    
    },
    signInWithGoogle: function () {

      var provider = new firebase.auth.GoogleAuthProvider();
      var that = this; 

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.


        var token = result.credential.accessToken;
        // The signed-in user info.
        that.thisUser = result.user;
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
  }

}
</script>
