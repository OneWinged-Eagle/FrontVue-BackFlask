<template>
	<div class="d-inline-flex">
		<v-text-field
			:value="address"
			color="accent"
			label="Address"
			@input="$emit('update:address', $event)"
		/>

		<v-btn color="accent" outlined @click="geocode">Get lat/lng</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"

import { snackbarActions } from "@/store/snackbar"
import { getErrorMessage } from "@/api/getErrorMessage"

@Component({
  name: "Geocoder",
  props: {
    address: { type: String, required: true },
    geolocation: { type: Array, required: true }
  }
})
export default class Geocoder extends Vue {
  address!: string
  geolocation!: [number, number]

  get url() {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=${process.env.VUE_APP_GEOCODING}`
  }

  geocode() {
    axios.get(this.url).then((response) => {
      console.info(response)
      const results = response.data.results

      if (results.length > 0) {
        this.$emit("update:address", results[0].formatted_address)
        this.$emit("update:geolocation", [results[0].geometry.location.lat, results[0].geometry.location.lng])
        snackbarActions.show({ text: "Address found!" })
      } else {
        snackbarActions.show({ color: "warning", text: "Address not found (no results)", timeout: 0 })
      }
    }).catch((error) => {
      console.error(error)
      snackbarActions.show({ color: "warning", text: `Address not found (${getErrorMessage(error)})`, timeout: 0 })
    })
  }
}
</script>
