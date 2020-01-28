<template>
	<v-navigation-drawer :value="drawer" @input="updateDrawer" app fixed>
		<v-list dense>
			<v-list-item :to="{ name: 'Products' }" exact>
				<v-list-item-action>
					<v-icon>mdi-domain</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>Products</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item :to="{ name: 'Map' }" exact>
				<v-list-item-action>
					<v-icon>mdi-map</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>Map</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item v-if="isAdmin" :to="{ name: 'Users' }" exact>
				<v-list-item-action>
					<v-icon>mdi-account-group</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>Users</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { userActions } from "@/store/user"

@Component({
  name: "Drawer",
  props: {
    drawer: { type: Boolean, required: true }
  }
})
export default class Drawer extends Vue {
  drawer!: boolean

  updateDrawer(drawer: boolean) {
    if (drawer !== this.drawer) {
      this.$emit('update:drawer', drawer)
    }
  }

  get isAdmin() {
    return userActions.isAdmin()
  }
}
</script>
