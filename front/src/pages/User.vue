<template>
	<v-card class="elevation-12" width="100%">
		<v-card-title v-if="canEdit">
			<v-spacer />

			<v-btn v-if="!edit" dark color="warning" fab small @click="startEditing">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
		</v-card-title>

		<v-progress-linear v-show="apiCore.loading" color="primary" indeterminate />

		<v-container class="data" grid-list-xl>
			<v-layout wrap>
				<v-flex xs12 sm6>
					<b>Email:</b>

					<span v-if="!edit && item.email">{{ item.email }}</span>

					<v-text-field
						v-if="edit"
						v-model.trim="editedUser.email"
						color="accent"
						label="Email"
						type="email"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Password:</b>

					<span v-if="!edit && item.password">{{ item.password }}</span>

					<v-text-field
						v-if="edit"
						v-model.trim="editedUser.password"
						color="accent"
						label="Password"
						type="password"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Role:</b>

					<span v-if="item.role">
						<v-icon color="primary">mdi-{{ item.role | roleIcon }}</v-icon>
						{{ item.role }}
					</span>
				</v-flex>
			</v-layout>
		</v-container>

		<v-card-actions v-if="edit">
			<boolean-modal
				btn-txt="DELETE"
				:title="`Delete ${item.email}`"
				:text="`Are you sure you want to delete the user '${item.email}'?`"
				false-txt="No, go back!"
				true-txt="Yes, delete it!"
				@true="deleteUser()"
			/>

			<v-spacer />

			<v-btn color="secondary" @click="cancel()">Cancel</v-btn>

			<v-btn color="primary" @click="apply()">Apply</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import clone from "lodash.clone"
import Component, { mixins } from "vue-class-component"

import BooleanModal from "@/components/BooleanModal.vue"

import Solo from "@/mixins/Solo"
import { ApiUsers } from "@/api/ApiUsers"
import { Role, User as U, blankUser } from "@/api/models/User"
import { userActions } from "@/store/user"

@Component({
  name: "User",
  components: { BooleanModal }
})
export default class User extends mixins(Solo) {
  item!: U
  apiCore = new ApiUsers()
  edit = false
  editedUser = blankUser

  get canEdit() {
    return userActions.isAdmin() && this.item.role !== Role.admin
  }

  startEditing() {
    this.editedUser = clone(this.item)
    this.edit = true
  }

  deleteUser() {
    this.apiCore.delete(this.item!._id!.$oid).then(() => {
      this.$router.push({ name: "Users" })
    })
  }

  cancel() {
    this.edit = false
    this.editedUser = clone(this.item)
  }

  apply() {
    this.apiCore.update(this.item!._id!.$oid, this.editedUser).then(() => {
      this.edit = false
      this.editedUser = clone(this.item)
    })
  }
}
</script>
