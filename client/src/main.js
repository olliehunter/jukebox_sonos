import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.use(BootstrapVue);
