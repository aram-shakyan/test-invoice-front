import Snotify from 'vue-snotify'
import Vue from 'vue'

Vue.use(Snotify, {
    toast: {
        timeout: 4000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false
    }
})

const snotify = Vue.$snotify

export default snotify