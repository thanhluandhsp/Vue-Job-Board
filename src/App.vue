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


    <md-layout>

        <div style="color:teal; margin:10px;">
        
        <hr style="border: 1px solid teal;
    display: block;
    height: 2px;
    margin: 1.5rem 0;"/>
        <p >
            <a href="http://lambdademy.com" style="color:teal">
            <b>LambdaDemy</b> </a> |  Học thực tiễn - Làm thực tế <br/>
              Lầu 2, Tòa nhà F Central, 16A Lê Hồng Phong, Phường 12, Quận 10, TP.HCM
          <br/>
          <a href="https://fb.me/LambdaDemy" style="color:teal">FB @ LambdaDemy</a>
            <br/>
            Phone: 0898 698 288<br/>
            Email: bonjour@LambdaDemy.com 
          </p>
        
        </div>
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
h1, h2, h3 {
  color: teal;
}
</style>