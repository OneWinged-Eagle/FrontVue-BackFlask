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
					<b>Name:</b>

					<span v-if="!edit && item.name">{{ item.name }}</span>

					<v-text-field v-if="edit" v-model.trim="editedProduct.name" color="accent" label="Name" />
				</v-flex>

				<v-flex xs12 sm6>
					<b>Description:</b>

					<span v-if="!edit && item.description">{{ item.description }}</span>

					<v-text-field
						v-if="edit"
						v-model.trim="editedProduct.description"
						color="accent"
						label="Description"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Price:</b>

					<span v-if="!edit && item.price">{{ item.price }}</span>

					<v-text-field
						v-if="edit"
						v-model.number="editedProduct.price"
						suffix="JPY"
						color="accent"
						label="Price"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Geolocation:</b>

					<span v-if="!edit && item.location && item.location">
						Lat:&nbsp;{{ item.location.geolocation[0] }}
						<br />
						Lng:&nbsp;{{ item.location.geolocation[1] }}
					</span>

					<reverse-geocoder
						v-if="edit"
						:lat.sync="editedProduct.location.geolocation[0]"
						:lng.sync="editedProduct.location.geolocation[1]"
						:address.sync="editedProduct.location.address"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Address:</b>

					<span v-if="!edit && item.location.address">{{ item.location.address }}</span>

					<geocoder
						v-if="edit"
						:address.sync="editedProduct.location.address"
						:geolocation.sync="editedProduct.location.geolocation"
					/>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Date added:</b>

					<span v-if="item.dateAdded">{{ item.dateAdded.$date | formatEpoch }}</span>
				</v-flex>

				<v-flex xs12 sm6>
					<b>Seller:</b>

					<span v-if="item.seller">
						<router-link
							:to="{ name: 'User', params: { id: item.seller._id.$oid }}"
						>{{ item.seller.email }}</router-link>
					</span>
				</v-flex>
			</v-layout>
		</v-container>

		<v-card-actions v-if="edit">
			<boolean-modal
				btn-txt="DELETE"
				:title="`Delete ${item.email}`"
				:text="`Are you sure you want to delete the product '${item.email}'?`"
				false-txt="No, go back!"
				true-txt="Yes, delete it!"
				@true="deleteProduct()"
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
import ReverseGeocoder from "@/components/ReverseGeocoder.vue"
import Geocoder from "@/components/Geocoder.vue"

import Solo from "@/mixins/Solo"
import { ApiProducts } from "@/api/ApiProducts"
import { Product as P, blankProduct } from "@/api/models/Product"
import { userActions } from "@/store/user"

@Component({
  name: "Product",
  components: { BooleanModal, ReverseGeocoder, Geocoder }
})
export default class Product extends mixins(Solo) {
  item!: P
  apiCore = new ApiProducts()
  edit = false
  editedProduct = blankProduct

  get canEdit() {
    return (userActions.isUser() && this.item.seller && userActions.getEmail() === this.item.seller.email) || userActions.isAdmin()
  }

  startEditing() {
    this.editedProduct = clone(this.item)
    this.edit = true
  }

  deleteProduct() {
    this.apiCore.delete(this.item!._id!.$oid).then(() => {
      this.$router.push({ name: "Products" })
    })
  }

  cancel() {
    this.edit = false
    this.editedProduct = clone(this.item)
  }

  apply() {
    this.apiCore.update(this.item!._id!.$oid, this.editedProduct).then(() => {
      this.edit = false
      this.editedProduct = clone(this.item)
    })
  }
}
</script>
