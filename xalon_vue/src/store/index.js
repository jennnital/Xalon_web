import Vuex from 'vuex'
import Vue from 'vue'
import site from './modules/site'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    site
  }
})
