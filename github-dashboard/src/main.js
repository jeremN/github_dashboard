import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './routes'
import store from './store/store'


axios.defaults.baseURL = 'https://api.github.com';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
