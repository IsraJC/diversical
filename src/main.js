import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import { auth } from './firebase'
import VueTextareaAutosize from 'vue-textarea-autosize'
import 'firebase/firestore'

import VueFormulate from '@braid/vue-formulate'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueFormulate)
Vue.use(VueTextareaAutosize);
Vue.use(vuetify)
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

let app
auth.onAuthStateChanged((user) => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }

    if (user) {
        store.dispatch('fetchUserProfile', user)
    }

})