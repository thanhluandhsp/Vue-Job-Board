<template>
  <div>
    <div v-if="loading">
    <p>Please type on the search input and press ENTER to get started...</p>
    </div>
  
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
  name: 'SearchJobs',
  components: {
      'app-jobcard':JobCard
  },
  data: function () {
    return {
      loading: true,
      jobs: [],
      term: ''
    }
  },
  methods: {
    getIndeedJobs() {
      this.$http.get('http://localhost/barodajobs/getjobs.php?q=' + term).then(response => {
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