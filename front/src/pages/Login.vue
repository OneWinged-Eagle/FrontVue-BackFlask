<template>
	<v-card class="elevation-12" width="100%">
		<h4>Login</h4>

		<v-text-field v-model.trim="email" color="accent" label="Email" type="email" />

		<v-text-field v-model="password" color="accent" label="Password" type="password" />

		<v-btn color="accent" text outlined @click="login">Login</v-btn>

		<v-spacer />

		<span class="overline">
			Need to
			<router-link :to="{ name: 'Signup', params: { nextUrl: $route.params.nextUrl }}">signup</router-link>?
		</span>
	</v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { ApiAuth } from "@/api/ApiAuth"
import { snackbarActions } from "@/store/snackbar"

@Component({
  name: "Login"
})
export default class Login extends Vue {
  apiAuth = new ApiAuth()
  email = ""
  password = ""

  login() {
    if (this.email.length > 0 && this.password.length > 0) {
      this.apiAuth.login(this.email, this.password)
    } else {
      snackbarActions.show({ color: "warning", text: "Email and/or password required.", timeout: 0 })
    }
  }
}
</script>
