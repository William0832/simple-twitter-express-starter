import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faSpinner,
  faBell,
  faMapMarkerAlt,
  faCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery')

library.add(faUserSecret)
library.add(faSpinner)
library.add(faBell)
library.add(faMapMarkerAlt)
library.add(faCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// let socketConnection = 'https://safe-sea-65364.herokuapp.com/'
// if (process.env.NODE_ENV !== 'production') {
//   // 如果不是 production 模式
//   socketConnection = 'http://localhost:3000'
// }
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000/',
    options: {} //Optional options
  })
)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
