<template>
<router-link :to="{ name: 'job-detail', params: { _key: job.key }}" style="text-decoration:none">
  <md-card md-with-hover md-card-expand class="card-job" style="width:500px;">
    <md-card-area>
  
      <md-card-header>
        
          <h3>
            {{ job.jobtitle }}</h3>
          
          <b style="text-align:center; color:teal">
        
        {{ job.company }}</b>
        
      </md-card-header>
      <md-card-content>

      <div style="text-align:left;  overflow: hidden;white-space: nowrap;

  text-overflow: ellipsis; max-height: 90px;">
        
        {{ job.location }}</div>
        
      </md-card-content>
  
    </md-card-area>
    
  </md-card>
  </router-link>
</template>
<script>
import TimeAgo from 'vue2-timeago'

export default {
  name: 'JobCard',
  components: {
     
      TimeAgo,


  },
  props: {
    job: {
      required: true,
      type: Object
    }
  }
}
</script>
