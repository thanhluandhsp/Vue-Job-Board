<template>
  <md-card md-with-hover class="card-job">
    <md-card-area>
  
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ job.jobtitle }}</div>
          <div class="md-subhead">in {{ job.company }}</div>
        </md-card-header-text>
      </md-card-header>
  
    </md-card-area>
    <md-card-actions>
      {{job.formattedRelativeTime}} &nbsp;
      <router-link tag="md-button" :to="{ name: 'job-detail', params: { jobkey: job.jobkey }}">View Job</router-link>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      required: true,
      type: Object
    }
  }
}
</script>
