import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import firebase from 'firebase';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import KProgress from 'k-progress';


import 'vue-material/dist/vue-material.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.component('k-progress', KProgress);

var firebaseConfig = {
  apiKey: "AIzaSyDLKVQgIAiSue5atI6q88iPLKuVeNMPBXQ",
  authDomain: "bucketlist-vue-f45dc.firebaseapp.com",
  projectId: "bucketlist-vue-f45dc",
  storageBucket: "bucketlist-vue-f45dc.appspot.com",
  messagingSenderId: "542222317379",
  appId: "1:542222317379:web:9062299b1cf1585eab21f6"
};

firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
