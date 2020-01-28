<template>
	<data-iterator :api-core="apiUsers" :fields="fields">
		<v-card slot="item" slot-scope="{ item, sortBy }">
			<v-card-title class="subheading font-weight-bold">
				{{ item.email }}
				<v-spacer />

				<v-btn dark color="warning" fab small :to="{ name: 'User', params: { id: item._id.$oid }}">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-card-title>

			<v-divider />

			<v-list dense>
				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'role' }">Role:</v-list-item-content>

					<v-list-item-content class="align-end">
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon color="primary" v-on="on">mdi-{{ item.role | roleIcon }}</v-icon>
							</template>
							<span>{{ item.role }}</span>
						</v-tooltip>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card>

		<create-user-dialog v-if="isAdmin" slot="action" :api-users="apiUsers" />
	</data-iterator>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import DataIterator from "@/components/DataIterator.vue"
import CreateUserDialog from "@/components/dialogs/CreateUserDialog.vue"

import { ApiUsers } from "@/api/ApiUsers"
import { userActions } from "@/store/user"

@Component({
  name: "Products",
  components: { DataIterator, CreateUserDialog }
})
export default class Products extends Vue {
  apiUsers = new ApiUsers()
  fields = ["email", "role"]

  get isAdmin() {
    return userActions.isAdmin()
  }
}
</script>
