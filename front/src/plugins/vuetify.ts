import Vue from "vue"
import Vuetify from "vuetify"

import "vuetify/dist/vuetify.min.css"
import colours from "vuetify/es5/util/colors"

import "@mdi/font/css/materialdesignicons.css"

Vue.use(Vuetify)

export const vuetify = new Vuetify({
	theme: {
		dark: true,
		options: {
			customProperties: true,
		},
		themes: {
			dark: {
				error: colours.red.darken1,
				primary: colours.purple.darken1,
				secondary: colours.indigo.darken1,
				info: colours.cyan.darken1,
				success: colours.green.darken1,
				accent: colours.yellow.darken1,
				warning: colours.orange.darken1
			},
		},
	},
})
