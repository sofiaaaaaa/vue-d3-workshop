import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'

import 'animate.css'
import 'normalize.css'
import '@/assets/sass/style.scss'

import chroma from 'chroma-js'
import Vuebar from 'vuebar'

import _ from 'lodash'

import 'ag-grid/src/styles/ag-grid.scss'
import 'ag-grid/src/styles/ag-theme-balham-dark.scss'
import 'ag-grid/src/styles/ag-theme-material.scss'

(window as any)._ = _

const debug = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false
Vue.config.performance = debug

Vue.use(VueAxios, Axios)

// Add custom scrollbar so it doesn't make things look ewwie
Vue.use(Vuebar)

// These are globally added to ALL components, beware
Vue.mixin({
  data() {
    return {
      colors: chroma.scale(chroma.brewer.Set3).colors,
      _debug: debug
    }
  }
})

if (debug) {
  Vue.mixin({
    methods: {
      openInEditor() {
        return Axios.get('__open-in-editor', {
          params: {
            file: (this.$options as any).__file
          }
        })
      }
    }
  })
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')