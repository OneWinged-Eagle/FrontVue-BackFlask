<template>
	<l-marker :lat-lng="geolocation" :draggable="false">
		<l-popup>
			<router-link :to="{ name: 'Product', params: { id: product._id.$oid }}">{{ product.name }}</router-link>
			<br />
			{{ product.description }}
			<br />
			Price:&nbsp;{{product.price}}&nbsp;JPY
			<br />
			{{product.location.address}}
		</l-popup>
	</l-marker>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { latLng } from "leaflet"

import { Product } from "@/api/models/Product"

@Component({
  name: "MapMarkerPopup",
  props: {
    product: { type: Object, required: true },
  }
})
export default class MapMarkerPopup extends Vue {
  product!: Product

  get geolocation() {
    return latLng(this.product.location.geolocation[0], this.product.location.geolocation[1])
  }
}
</script>
