<template>
	<data-iterator :api-core="apiProducts" :fields="fields">
		<v-card slot="item" slot-scope="{ item, sortBy }">
			<v-card-title class="subheading font-weight-bold">
				{{ item.name }}
				<v-spacer />

				<v-btn dark color="warning" fab small :to="{ name: 'Product', params: { id: item._id.$oid }}">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-card-title>

			<v-divider />

			<v-list dense>
				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'description' }">Description:</v-list-item-content>

					<v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'price' }">Price:</v-list-item-content>

					<v-list-item-content class="align-end">{{ item.price }}</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'geolocation' }">Geolocation:</v-list-item-content>

					<v-list-item-content class="align-end">
						Lat: {{ item.location.geolocation[0] }}
						<br />
						Lng: {{ item.location.geolocation[1] }}
					</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'address' }">Address:</v-list-item-content>

					<v-list-item-content class="align-end">{{ item.location.address }}</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'dateAdded' }">Date added:</v-list-item-content>

					<v-list-item-content class="align-end">{{ item.dateAdded.$date | formatEpoch }}</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content :class="{ 'blue--text': sortBy === 'seller' }">Seller:</v-list-item-content>

					<v-list-item-content class="align-end">
						<router-link
							:to="{ name: 'User', params: { id: item.seller._id.$oid }}"
						>{{ item.seller.email }}</router-link>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card>

		<create-product-dialog v-if="canAdd" slot="action" :api-products="apiProducts" />
	</data-iterator>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import DataIterator from "@/components/DataIterator.vue"
import CreateProductDialog from "@/components/dialogs/CreateProductDialog.vue"

import { ApiProducts } from "@/api/ApiProducts"
import { userActions } from "@/store/user"

@Component({
  name: "Products",
  components: { DataIterator, CreateProductDialog }
})
export default class Products extends Vue {
  apiProducts = new ApiProducts()
  fields = ["name", "description", "price", "geolocation", "address", "dateAdded", "seller"]

  get canAdd() {
    return userActions.isUser() || userActions.isAdmin()
  }
}
</script>
