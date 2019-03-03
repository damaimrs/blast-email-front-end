// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueWysiwyg from 'vue-wysiwyg'
import VueSelect from 'vue-select'
import VueSession from 'vue-session'
import VIcon from 'vue-icon'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

let wysiwygConfig = {
  hideModules: {
    'image': true
  }
}

let vueSessionConfig = {
  persist: true
}

Vue.use(BootstrapVue)
Vue.use(VueWysiwyg, wysiwygConfig)
Vue.use(VueSession, vueSessionConfig)
Vue.use(VIcon, 'v-icon')

Vue.component('v-select', VueSelect)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
