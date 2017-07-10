<template>
  <div>
    <md-spinner md-indeterminate class="md-accent" v-if="loading"></md-spinner>
  
    <div v-if="!loading">
      <md-subheader>Latest Job Posts</md-subheader>
      <md-layout>
        <md-layout md-flex="33" v-for="job in jobs" :key="job.jobkey">
          <app-jobcard :job="job"></app-jobcard>
        </md-layout>
      </md-layout>
    </div>
  </div>
</template>

<script>
import JobCard from './includes/JobCard.vue'
export default {
  name: 'JosbListings',
  components: {
      'app-jobcard':JobCard
  },
  data: function () {
    return {
      loading: true,
      jobs: []
    }
  },
  created: function () {
    this.getIndeedJobs();
  },
  methods: {
    getIndeedJobs() {
      this.$http.get('http://localhost/barodajobs/getjobs.php').then(response => {
        this.loading = false;

        this.jobs = response.data.results;

      }, response => {

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