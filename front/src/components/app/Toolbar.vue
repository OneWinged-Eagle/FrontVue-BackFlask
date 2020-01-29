<template>
	<v-app-bar app fixed>
		<v-app-bar-nav-icon @click.stop="$emit('update:drawer', !drawer)" />

		<v-toolbar-title>App</v-toolbar-title>

		<v-spacer />

		<v-btn v-if="isLogged" color="accent" outlined rounded @click="clear">Log out</v-btn>

		<v-btn
			v-else
			color="success"
			outlined
			rounded
			:to="{name: 'Login', params: { nextUrl: $route.fullPath }}"
		>Log in</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

import { Storage } from "@/utils/Storage"
import { userActions } from "@/store/user"

@Component({
  name: "Toolbar",
  props: {
    drawer: { type: Boolean, required: true }
  }
})
export default class Toolbar extends Vue {
  get isLogged() {
    return userActions.isLogged()
  }

  clear() {
    Storage.clear()
    this.$router.go(0)
  }
}
</script>
