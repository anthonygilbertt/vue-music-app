import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'
import { projectAuth } from '../firebase/config'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'

// Route Guard
const protectedRoute = (to, from, next) => {
    let user = projectAuth.currentUser

    console.log('current user in auth guard ', user);
    if (!user) {
        next({ name: 'Login' })
    } else {
        next()
    }
}


const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: protectedRoute
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/playlists/create',
        name: 'CreatePlaylist',
        component: CreatePlaylist,
        beforeEnter: protectedRoute
    },
    {
        path: '/playlists/:id',
        name: 'PlaylistDetails',
        component: PlaylistDetails,
        beforeEnter: protectedRoute,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router