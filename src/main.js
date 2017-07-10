// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import VeeValidate from 'vee-validate'
import store from './store'

/**
 * Vue Material configurations
 */
import 'vue-material/dist/vue-material.css';
Vue.use(VueMaterial);
Vue.material.registerTheme('default', {
    primary: 'purple',
    accent: 'amber',
    warn: 'red',
    background: 'white'
})


Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});