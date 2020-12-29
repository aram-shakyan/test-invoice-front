import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import invoiceModule from './modules/invoice'
import authModule from './modules/auth'

export default new Vuex.Store({
  modules: {
    invoiceModule,
    authModule
  }
})
