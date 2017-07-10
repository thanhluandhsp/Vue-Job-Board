<template>
  <md-card md-with-hover class="card-job">
    <md-card-area>
  
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ job.jobtitle }}</div>
          <div class="md-subhead">in {{ job.company }}</div>
        </md-card-header-text>
        <md-menu md-size="4" md-direction="bottom left">
          <md-button class="md-icon-button" md-menu-trigger>ƒ
            <md-icon>more_vert</md-icon>
          </md-button>
  
          <md-menu-content>
            <md-menu-item>
              <span>{{job.formattedLocation}}</span>
              <md-icon>map</md-icon>
            </md-menu-item>
  
            <md-menu-item>
              <span>Send a message</span>
              <md-icon>message</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-header>
  
      <md-card-content>
        {{ job.snippet }}
      </md-card-content>
  
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
