<template>
	<v-dialog v-model="dialog" scrollable max-width="60vw">
		<template #activator="{ on }">
			<v-btn slot="activator" dark color="primary" fab small v-on="on">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title class="accent">
				<h5 class="headline">Create new product</h5>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-xl>
					<v-layout wrap>
						<v-flex xs12 sm6 lg4>
							<v-text-field v-model.trim="product.name" color="accent" label="Name" />
						</v-flex>

						<v-flex xs12 sm6 lg4>
							<v-text-field v-model.trim="product.description" color="accent" label="Description" />
						</v-flex>

						<v-flex xs12 sm6 lg4>
							<v-text-field v-model.number="product.price" suffix="JPY" color="accent" label="Price" />
						</v-flex>

						<v-flex xs12 sm6>
							<reverse-geocoder
								:lat.sync="product.location.geolocation[0]"
								:lng.sync="product.location.geolocation[1]"
								:address.sync="product.location.address"
							/>
						</v-flex>

						<v-flex xs12 sm6>
							<geocoder
								:address.sync="product.location.address"
								:geolocation.sync="product.location.geolocation"
							/>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-divider />

			<v-card-actions>
				<v-spacer />

				<v-btn color="accent" text outlined @click="dialog = false">Cancel</v-btn>

				<v-btn color="accent" text outlined @click="insertProduct">Insert new product</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import clone from "lodash.clone"

import ReverseGeocoder from "@/components/ReverseGeocoder.vue"
import Geocoder from "@/components/Geocoder.vue"

import { ApiProducts } from "@/api/ApiProducts"
import { blankProduct } from "@/api/models/Product"

@Component({
  name: "CreateProductDialog",
  components: { ReverseGeocoder, Geocoder },
  props: {
    apiProducts: { type: ApiProducts, required: true }
  }
})
export default class CreateProductDialog extends Vue {
  apiProducts!: ApiProducts
  dialog = false
  product = clone(blankProduct)

  insertProduct() {
    this.apiProducts.insert(this.product).then(() => {
      this.dialog = false
      this.product = clone(blankProduct)
    })
  }
}
</script>
