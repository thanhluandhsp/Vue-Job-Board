<template>
  <div id="app">
  
    <Toolbar></Toolbar>

    <md-whiteframe style="background:white">
      <md-input-container>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-input placeholder="Search for Jobs"></md-input>
      </md-input-container>
    </md-whiteframe>
  
    <md-layout md-gutter>
      <md-layout md-flex="25">
        <SidebarJobs></SidebarJobs>
      </md-layout>
      <md-layout md-flex="75">
        <router-view></router-view>
      </md-layout>
    </md-layout>
  
  </div>
</template>

<script>
import Toolbar from '@/components/includes/Toolbar.vue';
import SidebarJobs from '@/components/includes/SidebarJobs.vue';
export default {
  name: 'app',
  components: { Toolbar, SidebarJobs },
}
</script>

<style>
body {
  background: #fcfcfc
}
#app {
  max-width: 1120px;
  margin: 0 auto;
}

h2.md-title {
  cursor: pointer
}
</style>