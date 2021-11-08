import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

// Global styles
import '@/assets/main.css'

let app

projectAuth.onAuthStateChanged(() => {
    // this gets fired when the Auth State changes
    // for example: when when we "have a user"
    // (The user state changes)
    if (!app) {
        app = createApp(App)
            .use(router)
            .mount('#app') //we don't want to mount until the auth state changes
    }
})