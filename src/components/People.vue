<template>
  <div id="people">
    <md-layout md-gutter v-if="users">
      <md-layout md-flex="33" v-for="user in users" :key="user.uid">
        <md-card style="width:100%; margin: 10px">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ user.displayName }}</div>
              <div class="md-subhead">{{ user.status }}</div>
            </md-card-header-text>
  
            <md-card-media>
              <img :src="user.pictureUrl" alt="profile pic">
            </md-card-media>
          </md-card-header>
  
          <md-card-actions>
            <router-link tag="md-button" :to="{ name: 'Profile-detail', params: { id: user.id }}">Full View</router-link>
            <md-button>Message</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import { firebaseApp } from '@/firebase'
const db = firebaseApp.database();

export default {

  name: 'People',
  data: function () {
    return {
      users: null,
      loading: true
    }
  },
  created:function() {
    this.getUsers();
    this.loading = false;
  },
  methods: {
    getUsers() {
      let self = this;
      db.ref("users").orderByKey().limitToLast(40).on('value', function (snapshot) {
        self.users = snapshot.val();
        console.log(self.users);
      })
    }
  },

}
</script>

