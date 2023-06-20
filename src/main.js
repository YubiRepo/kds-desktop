import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Echo from "laravel-echo"
import Pusher from 'pusher-js'

window.Pusher = Pusher

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_APP_WEBSOCKETS_KEY,
    wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    authEndpoint: import.meta.env.VITE_APP_API_URL + '/auth/profile',
    auth: {
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjU3OjgxNjkvbW9iaWxlL2F1dGgvbG9naW4iLCJpYXQiOjE2NzgwNzMxMjQsImV4cCI6MTY3ODI4OTEyNCwibmJmIjoxNjc4MDczMTI0LCJqdGkiOiJ0REJtQzFoaUE2bERJbHdlIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.jmyooa418xwdzqMBHr6NinN9VtxWUWVUTuf2pt4cfvU',
        }
    },

})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')