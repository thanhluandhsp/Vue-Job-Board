<template>
  <md-layout>

    <md-card md-with-hover class="card-job">
    
  
      <md-card-header>
        
          <h2>Post Job</h2>
      </md-card-header>
      

       <md-card-content>
        <p>Weather you are a company, a staffing company or an Individual. We accept all the new job vacancies.</p>
      
    <form @submit.prevent="addJobPost(form)">
      <md-input-container :class="{'md-input-invalid': errors.has('jobtitle')}">
        <label for="jobtitle">Job Title *</label>
        <md-input v-model="form.jobtitle" data-vv-name="jobtitle" type="text" v-validate name="jobtitle" data-vv-rules="required|min:10"></md-input>
        <span class="md-error">{{errors.first('jobtitle')}}</span>
      </md-input-container>
  
      <md-input-container :class="{'md-input-invalid': errors.has('company')}">
        <label for="company">Company *</label>
        <md-input v-model="form.company" data-vv-name="company" type="text" v-validate name="company" data-vv-rules="required|min:5"></md-input>
        <span class="md-error">{{errors.first('company')}}</span>
      </md-input-container>

  
      <md-input-container :class="{'md-input-invalid': errors.has('location')}">
        <label for="location">City *</label>
        <md-input v-model="form.location" data-vv-name="location" type="text" v-validate name="location" data-vv-rules="required"></md-input>
        <span class="md-error">{{errors.first('location')}}</span>
      </md-input-container>

      
      <md-input-container >
        <label for="website">Website</label>
        <md-input v-model="form.website" data-vv-name="website" type="text" v-validate name="website" ></md-input>
        <span class="md-error">{{errors.first('website')}}</span>
      </md-input-container>

      
      <md-input-container :class="{'md-input-invalid': errors.has('email')}">
        <label for="email">Email *</label>
        <md-input v-model="form.email" data-vv-name="email" type="text" v-validate name="email"></md-input>
        <span class="md-error">{{errors.first('email')}}</span>
      </md-input-container>
      
      
      
      <md-input-container>
        <label for="phone">Contact Phone</label>
        <md-input v-model="form.phone" data-vv-name="phone" type="text" v-validate name="phone" ></md-input>
        <span class="md-error">{{errors.first('phone')}}</span>
      </md-input-container>
      
      
      
      <md-input-container >
        <label for="phone">Skype</label>
        <md-input v-model="form.skype" data-vv-name="skype" type="text" v-validate name="skype" ></md-input>
        <span class="md-error">{{errors.first('skype')}}</span>
      </md-input-container>

      
      <md-input-container >
        <label for="email">How to apply</label>
        <md-input v-model="form.how" data-vv-name="how" type="text" name="how" ></md-input>
        <span class="md-error">{{errors.first('how')}}</span>
      </md-input-container>
  
      <md-input-container :class="{'md-input-invalid': errors.has('description')}">
        <label for="snippet">Job Description *</label>
        <md-textarea v-model="form.description" data-vv-name="snippet" type="text" v-validate name="snippet" data-vv-rules="required|min:25" style="min-height:130px"></md-textarea>
        <span class="md-error">Please add some description of minimum 25 characters.</span>
      </md-input-container>

      
      <md-input-container >
        <label for="snippet">Why join us.</label>
        <md-textarea v-model="form.why" data-vv-name="snippet" type="text" v-validate name="snippet" data-vv-rules="required|min:25" style="min-height:130px"></md-textarea>
        <span class="md-error"></span>
      </md-input-container>

      
      <md-input-container >
        <label for="snippet">Benefits</label>
        <md-textarea v-model="form.benefits" data-vv-name="snippet" type="text" v-validate name="snippet" data-vv-rules="required|min:25" style="min-height:130px"></md-textarea>
        <span class="md-error"></span>
      </md-input-container>


      
      <md-input-container >
        <label for="snippet">Responsibilities</label>
        <md-textarea v-model="form.responsibilities" data-vv-name="snippet" type="text" v-validate name="snippet" data-vv-rules="required|min:25" style="min-height:130px"></md-textarea>
        <span class="md-error"></span>
      </md-input-container>

      
      <md-input-container >
        <label for="snippet">Skills and Experience  *</label>
        <md-textarea v-model="form.skills" data-vv-name="snippet" type="text" v-validate name="snippet" data-vv-rules="required|min:25" style="min-height:130px"></md-textarea>
        <span class="md-error"></span>
      </md-input-container>
<!--   
      <div :class="{'md-input-invalid': errors.has('tnccheck')}">
        <md-checkbox id="tnccheck" name="tnccheck" v-model="form.tnccheck" type="checkbox" checked="checked" aria-checked="checked" data-vv-name="snippet" data-vv-rules="required" class="md-warn">By Submiting the Job Post you agree to all the terms and conditions?</md-checkbox>
      </div> -->
  
      <md-button type="submit" class="md-button md-button md-accent md-raised md-theme-default">Publish</md-button>
    </form>

     </md-card-content>
    </md-card>
  
  </md-layout>
</template>

<script>
import { firebaseApp } from '@/firebase'
import store from '../store'
const db = firebaseApp.database();

export default {

  name: 'AddJob',
  data: function () {
    return {
      form: {
        jobtitle: '',
        company: '',
        location: '',
        description: '',
        why: '',
        benefits: '',
        responsibilities: '',
        skills: '',
        email: '',
        phone: '',
        website: '',
        how: '',
        disabled: false,
        created_at: new Date(),
       
        tnccheck: '',
       
      },
      alertSuccess: {
        content: 'Your job post has been submitted!',
        ok: 'Cool!'
      },
      loading: false
    }
  },
  created: function () {
    this.loading = false;
  },
  methods: {
    addJobPost(formData) {
      var that = this; 
      this.$validator.validateAll().then(results => {
        if (results) {


          // Get a key for a new Post.
          var newJobKey = db.ref().child('jobs').push().key;
          var updates = {};
          //debugger;
          this.form.user_id = store.state.thisUser.uid;
          updates['/jobs/' + newJobKey]= this.form;
  
          db.ref().update(updates);
          that.$router.push("/job/" + newJobKey);
        }
      }).catch((error) => {
        // eslint-disable-next-line
        alert(error);
      });
    }
  },

}
</script>

