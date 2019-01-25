<template>
  <div id="app">
  
    <Toolbar></Toolbar>

    <md-whiteframe style="background:white">
      <!-- <md-input-container>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-input placeholder="Search for Jobs"></md-input>
      </md-input-container> -->
    </md-whiteframe>
  
    <md-layout md-gutter>
     
      <md-layout>
        <router-view></router-view>
      </md-layout>
    </md-layout>
  
  </div>
</template>

<script>
import Toolbar from '@/components/includes/Toolbar.vue';
export default {
  name: 'app',
  components: { Toolbar },
}
</script>

<style>
body {
  background: #fcfcfc
}
#app {
  
  margin: 0 auto;
}

h2.md-title {
  cursor: pointer
}
</style>