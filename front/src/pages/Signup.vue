<template>
	<v-card class="elevation-12" width="100%">
		<h4>Signup</h4>

		<v-text-field v-model.trim="email" color="accent" label="Email" type="email" />

		<v-text-field v-model="password" color="accent" label="Password" type="password" />

		<v-text-field v-model="passwordConfirm" color="accent" label="Password" type="password" />

		<v-btn color="accent" text outlined @click="signup">Signup</v-btn>

		<v-spacer />

		<span class="overline">
			Need to
			<router-link :to="{ name: 'Login', params: { nextUrl: $route.params.nextUrl }}">login</router-link>?
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
  passwordConfirm = ""

  signup() {
    if (this.email.length === 0 || this.password.length === 0) {
      snackbarActions.show({ color: "warning", text: "Email and/or password required.", timeout: 0 })
    }
    else if (this.password !== this.passwordConfirm) {
      snackbarActions.show({ color: "warning", text: "Passwords don't match.", timeout: 0 })
    } else {
      this.apiAuth.signup(this.email, this.password)
    }
  }
}
</script>
