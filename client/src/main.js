import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './quasar/quasar';
import moment from 'moment';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');



Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});