<template>
	<div class="d-inline-flex">
		<v-text-field :value="lat" color="accent" label="Latitude" @input="$emit('update:lat', $event)" />

		<v-text-field :value="lng" color="accent" label="Longitude" @input="$emit('update:lng', $event)" />

		<v-btn color="accent" outlined @click="geocode">Get address</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"

import { snackbarActions } from "@/store/snackbar"
import { getErrorMessage } from "@/api/getErrorMessage"

@Component({
  name: "ReverseGeocoder",
  props: {
    lat: { type: [Number, String], required: true },
    lng: { type: [Number, String], required: true },
    address: { type: String, required: true }
  }
})
export default class ReverseGeocoder extends Vue {
  lat!: number
  lng!: number
  address!: string

  get url() {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=${process.env.VUE_APP_GEOCODING}`
  }

  geocode() {
    axios.get(this.url).then((response) => {
      console.info(response)

      const results = response.data.results

      if (results.length > 0) {
        this.$emit("update:address", results[0].formatted_address)
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
