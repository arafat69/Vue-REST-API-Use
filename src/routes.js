import Home from './components/Home.vue'
import Add from './components/add.vue'
import Edit from './components/edit.vue'
import Login from './components/login.vue'
import Signup from './components/signup.vue'
import User from './components/user.vue'

import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
    {path:'/', name:'Login',component: Login},
    {path:'/register',name:'signup',component: Signup},
    {path:'/user',name:'user',component: User},
    {path:'/home',name:'Home',component: Home},
    {path:'/add',name:'Add',component: Add},
    {path:'/edit/:id:',name:'Edit',component: Edit}
]

const route = createRouter({
    history:createWebHashHistory(),
    routes,
    linkActiveClass : 'active'
})

export default route