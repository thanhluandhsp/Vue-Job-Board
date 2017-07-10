<template>
  <aside>
    <md-subheader>Navigation</md-subheader>
    <md-list>
      <md-list-item>
        <router-link to="/">
          <md-icon>home</md-icon>
          <span>Home</span>
        </router-link>
      </md-list-item>
  
      <md-list-item>
        <router-link to="/people">
          <md-icon>account_circle</md-icon>
          <span>People</span>
        </router-link>
      </md-list-item>
  
      <md-list-item md-expand-multiple>
        <md-icon>list</md-icon>
        <span>Categories</span>
  
        <md-list-expand>
          <md-list>
            <md-list-item class="md-inset">World</md-list-item>
            <md-list-item class="md-inset">Americas</md-list-item>
            <md-list-item class="md-inset">Europe</md-list-item>
          </md-list>
        </md-list-expand>
      </md-list-item>
    </md-list>


    <md-subheader>Recent Logins</md-subheader>

    <md-list>

      <md-list-item v-for="user in users" :key="user.uid">
        <md-avatar>
          <img :src="user.pictureUrl" alt="People">
        </md-avatar>
  
        <span>{{ user.displayName }}</span>
  
        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">chat_bubble</md-icon>
        </md-button>
      </md-list-item>

    </md-list>
  
  </aside>
</template>

<script>
import { firebaseApp } from '@/firebase'
const db = firebaseApp.database();

export default {
  name: 'SidebarJobs',
  data: function () {
    return {
      users: null
    }
  },
  created: function() {
    
    this.getRecentUsers();
    
  },
  methods: {
    getRecentUsers() {
      let self = this;
      db.ref("users").orderByKey().limitToLast(6).once('value', function (snapshot) {
        self.users = snapshot.val();
      });
    }
  }
}
</script>
