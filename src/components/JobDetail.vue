<template>
  <md-layout>

     <md-subheader>
        <md-button @click="$router.go(-1)" class="md-icon-button md-raised md-accent">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
        <md-icon style="padding: 0px;margin:0 0 0 15px;">place</md-icon> {{ job.formattedLocation }}
      </md-subheader>

    <md-card md-with-hover class="card-job"  v-if="job">
    
  
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
              {{ job.created }} 
              </span>
              
            </div>


            <div class="md-body-2">
              <h3>Job Description</h3>
              {{ job.description }}
            </div>

            
            <div class="md-body-2" v-if="job.why">
              <h3>Why join us</h3>
              {{ job.why }}
            </div>

            
            <div class="md-body-2" v-if="job.benefits">
              <h3>Benefits</h3>
              {{ job.benefits }}
            </div>

              
            <div class="md-body-2" v-if="job.responsibilities">
              <h3>Responsibilities</h3>
              {{ job.responsibilities }}
            </div>

              
            <div class="md-body-2" v-if="job.skills">
              <h3>Your Skills and Experience</h3>
              {{ job.skills }}
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



export default {
  name: 'JobDetail',
  props: ['key'],
  components: {
    BulletListLoader
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
