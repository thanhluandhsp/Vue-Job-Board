<template>
  
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
