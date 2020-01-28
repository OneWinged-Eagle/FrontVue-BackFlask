import Vue from "vue"

import App from "./App.vue"

import "./registerServiceWorker"
import "./filters"
import { router } from "./router"
import "./plugins/vue-leaflet"
import { vuetify } from "./plugins/vuetify"

import "./assets/app.css"

Vue.config.performance = process.env.NODE_ENV !== "production"
Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: (h) => h(App)
}).$mount("#app")
