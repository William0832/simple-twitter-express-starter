import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

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
