<template>
  <div>


  
    <div>
      <md-subheader>Công việc mới nhất</md-subheader>
      <md-layout>
        <md-layout style="flex:auto" v-for="job in jobs" :_key="job.key">
          <app-jobcard :job="job"></app-jobcard>
        </md-layout>
      </md-layout>
    </div>
  </div>
</template>

<script>
import JobCard from './includes/JobCard.vue'
import TimeAgo from 'vue2-timeago'

import { firebaseApp } from '@/firebase'
import store from '../store'
const db = firebaseApp.database();

export default {
  name: 'JosbListings',
  components: {
      'app-jobcard':JobCard,
      TimeAgo,


  },
  data: function () {
    return {
      loading: true,
      jobs: []
    }
  },
  created() {
    this.getJobs();
  },
  methods: {
    getJobs() {
      var that = this;

        
      db.ref('/jobs/')
        .on('value',function(snapshot) {
          var items = [];
          snapshot.forEach((child) => {
            items.push({
              key: child.key,
              ...child.val()
            });
          });



          that.jobs = items.reverse();

        
      });

    
    }
  }
}
</script>

<style>
.card-job {
  margin: 10px;
  width: 100%
}
.md-card .md-title {
  font-size: 20px;
  line-height: 26px;
}
</style>