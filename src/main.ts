import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./app.vue"
import router from "./router"

import "@fontsource/nunito"
import "@fontsource/raleway"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
