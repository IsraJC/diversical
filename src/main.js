import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import { auth } from './firebase'
import VueTextareaAutosize from 'vue-textarea-autosize';
import 'firebase/firestore';
import './assets/scss/app.scss'

import VueFormulate from '@braid/vue-formulate'
import vuetify from './plugins/vuetify';

Vue.use(VueFormulate)
Vue.use(VueTextareaAutosize);
Vue.use(vuetify)

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
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