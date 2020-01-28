<template>
	<v-dialog v-model="dialog" scrollable max-width="60vw">
		<template #activator="{ on }">
			<v-btn slot="activator" dark color="primary" fab small v-on="on">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title class="accent">
				<h5 class="headline">Create new user</h5>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-xl>
					<v-layout wrap>
						<v-flex xs12 sm6 lg4>
							<v-text-field v-model.trim="user.email" color="accent" label="Email" type="email" />
						</v-flex>

						<v-flex xs12 sm6 lg4>
							<v-text-field v-model="user.password" color="accent" label="Password" type="password" />
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-divider />

			<v-card-actions>
				<v-spacer />

				<v-btn color="accent" text outlined @click="dialog = false">Cancel</v-btn>

				<v-btn color="accent" text outlined @click="insertUser">Insert new user</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import clone from "lodash.clone"

import { ApiUsers } from "@/api/ApiUsers"
import { blankUser } from "@/api/models/User"

@Component({
  name: "CreateUserDialog",
  props: {
    apiUsers: { type: ApiUsers, required: true }
  }
})
export default class CreateUserDialog extends Vue {
  apiUsers!: ApiUsers
  dialog = false
  user = clone(blankUser)

  insertUser() {
    this.apiUsers.insert(this.user).then(() => {
      this.dialog = false
      this.user = clone(blankUser)
    })
  }
}
</script>
