import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css';
import Mock from './mock/mock.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!sessionStorage.username) { 
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
  })
  
