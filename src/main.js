import {createApp} from 'vue'
// import Vue from 'vue'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


//support for axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//import router
import route from './routes'

axios.defaults.baseURL = 'http://localhost/laravel8api/api/'
let token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
}
 


createApp(App).use(VueAxios,axios).use(route).use(VueSweetalert2).mount('#app')