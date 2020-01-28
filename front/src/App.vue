<template>
	<v-app dark>
		<app-snackbar />

		<app-drawer :drawer.sync="drawer" />

		<app-toolbar :drawer.sync="drawer" />

		<v-content>
			<v-container fill-height fluid tag="section">
				<v-fade-transition mode="out-in">
					<router-view :key="$route.fullPath" />
				</v-fade-transition>
			</v-container>
		</v-content>

		<app-footer />
	</v-app>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import AppSnackbar from "./components/app/Snackbar.vue"
import AppDrawer from "./components/app/Drawer.vue"
import AppToolbar from "./components/app/Toolbar.vue"
import AppFooter from "./components/app/Footer.vue"

@Component({
  name: "App",
  components: { AppSnackbar, AppDrawer, AppToolbar, AppFooter }
})
export default class App extends Vue {
  drawer = false
}
</script>
