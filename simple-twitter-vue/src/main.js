import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSpinner, faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery');


library.add(faUserSecret)
library.add(faSpinner)
library.add(faBell)
library.add(faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(new VueSocketIO({
  debug: true,
  connection: '//localhost:3000',
  options: {} //Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
