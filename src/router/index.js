import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        // beforeEnter: (to, from, next) => {
        //     // ...
        // }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        // beforeEnter: (to, from, next) => {
        //     // ...
        // }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        // beforeEnter: (to, from, next) => {
        //     // ...
        // }
    },
    {
        path: '/playlists/create',
        name: 'CreatePlaylist',
        component: CreatePlaylist,
        // beforeEnter: (to, from, next) => {
        //     // ...
        // }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router