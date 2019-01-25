<template>
  <md-layout>


    <md-card md-with-hover  v-if="job">
    
  
      <md-card-header>
     
          
            <h2 >{{ job.jobtitle }}</h2>
      </md-card-header>
      

      <md-card-content>

          <div class="md-body-2" style="">
            
            <span class="md-headline md-primary">{{ job.company }}</span>
            <hr>
            <div class="md-body-1">
              <span style="margin-right: 10px">
              Posted <md-icon>access_time</md-icon>
              
              <time-ago  :datetime="job.created_at" long></time-ago>  <md-icon style="padding: 0px;margin:0 0 0 15px;">place</md-icon> {{ job.location }}

              </span>
              
            </div>


            <div class="md-body-2">
              <h3>Job Description</h3>
                <vue-markdown>  &nbsp;
              {{ job.description }}</vue-markdown>
            </div>

            
            <div class="md-body-2" v-if="job.why">
              <h3>Why join us</h3>
                <vue-markdown>  &nbsp;
              {{ job.why }}</vue-markdown>
            </div>

            
            <div class="md-body-2" v-if="job.benefits">
              <h3>Benefits</h3>  <vue-markdown>  &nbsp;
              {{ job.benefits }}</vue-markdown>
            </div>

              
            <div class="md-body-2" v-if="job.responsibilities">
              <h3>Responsibilities</h3>
               <vue-markdown>  &nbsp;
              {{ job.responsibilities }}</vue-markdown>
            </div>

              
            <div class="md-body-2" v-if="job.skills">
              <h3>Your Skills and Experience</h3>
                <vue-markdown> &nbsp; {{ job.skills }}
                </vue-markdown>

            </div>




            <br>

            <md-button class="md-button md-accent md-raised" target="_blank" :href="job.url">Apply Now</md-button>

          </div>
      
      
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import { firebaseApp } from '@/firebase'
const db = firebaseApp.database();
import { BulletListLoader } from 'vue-content-loader'
import TimeAgo from 'vue2-timeago'
import VueMarkdown from 'vue-markdown'





export default {
  name: 'JobDetail',
  props: ['key'],
  components: {
    BulletListLoader,
    TimeAgo,
    VueMarkdown


  },

  data: function () {
    return {
      loading: true,
      job: null
    }
  },
 
  mounted() {
    
    this.getJob();
  },
  methods: {
    getJob() {
      var that = this;
      
        
      db.ref('/jobs/' +  this.key)

        .on('value',function(snapshot) {
          
          that.job = snapshot.val();
          that.loading = false;
        
      });

    
    }
  }

}
</script>
