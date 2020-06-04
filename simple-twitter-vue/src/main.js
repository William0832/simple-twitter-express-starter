import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery');
// console.log(window.$)



Vue.use(new VueSocketIO({
  debug: true,
  connection: '//localhost:4000',
  options: {} //Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
