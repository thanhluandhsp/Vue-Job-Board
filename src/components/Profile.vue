<template>
  <div id="profile">
  
    <h2>My Profile</h2>
  
    <md-spinner md-indeterminate class="md-accent" v-if="loading"></md-spinner>
  
    <form novalidate @submit.stop.prevent="submit" v-if="!loading">
      <md-layout md-gutter v-if="users">
        <md-input-container>
          <label>Full Name</label>
          <md-input v-model="initialValue"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Designation</label>
          <md-input maxlength="140" v-model="initialValue"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Textarea</label>
          <md-textarea maxlength="200"></md-textarea>
        </md-input-container>
      </md-layout>
    </form>
  
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      details: [],
      loading: true
    }
  }
}
</script>
