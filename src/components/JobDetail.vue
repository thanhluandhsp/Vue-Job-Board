<template>
  <div id="job-detail">
    <md-spinner md-indeterminate v-if="loading"></md-spinner>
  
    <span v-if="job">

      <md-subheader>
        <md-button @click="$router.go(-1)" class="md-icon-button md-raised md-accent">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
        <md-icon style="padding: 0px;margin:0 0 0 15px;">place</md-icon> {{ job.formattedLocation }}
      </md-subheader>
  
      <div class="md-body-2" style="padding:0 16px">
        <h2 class="md-display-2">{{ job.jobtitle }}</h2>
        <span class="md-headline md-primary">{{ job.company }}</span>
        <hr>
        <div class="md-body-1">
          <span style="margin-right: 10px">
          Posted <md-icon>access_time</md-icon>
          {{ job.formattedRelativeTime }} 
          </span>
          in <md-icon>link</md-icon>
          {{ job.source }}
        </div>

        <br>
        <br>

        <div class="md-body-2">
          {{ job.snippet }}
        </div>

        <br>
        <br>

        <md-button class="md-button md-accent md-raised" target="_blank" :href="job.url">Apply Now</md-button>

      </div>
  
    </span>
  
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  props: ['key'],

  data: function () {
    return {
      loading: true,
      job: null
    }
  },
    created() {
    this.getJob();
  },
  methods: {
    getJob() {
      var that = this;

      debugger;
        
      db.ref('/jobs/' +  this.data.key)

        .on('value',function(snapshot) {

          that.jobs = snapshot.val();
        
      });

    
    }
  }

}
</script>
