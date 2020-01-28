<template>
	<v-card class="elevation-12" height="100%" width="100%">
		<l-map :zoom="zoom" :center="center">
			<l-tile-layer :url="url" :attribution="attribution" />

			<map-marker-popup
				v-for="product in apiProducts.items"
				:key="product.name"
				:product="product"
			/>
		</l-map>
	</v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { latLng } from "leaflet"

import MapMarkerPopup from "@/components/MapMarkerPopup.vue"

import { ApiProducts } from "@/api/ApiProducts"

@Component({
  name: "Map",
  components: { MapMarkerPopup }
})
export default class Map extends Vue {
  apiProducts = new ApiProducts()
  zoom = 12
  center = latLng(35.659060, 139.700559)
  url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

  created() {
    this.apiProducts.getAll()
  }
}
</script>
