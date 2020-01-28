<template>
	<v-snackbar v-bind="props">
		{{ text }}
		<v-btn icon @click="hide">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { snackbarState, snackbarActions } from "@/store/snackbar"

@Component({
  name: "Snackbar"
})
export default class Snackbar extends Vue {
  get props() {
    return {
      color: snackbarState.color,
      "multi-line": snackbarState.mode === "multi-line",
      vertical: snackbarState.mode === "vertical",
      timeout: snackbarState.timeout,
      value: snackbarState.visible,
      right: snackbarState.x === "right",
      left: snackbarState.x === "left",
      top: snackbarState.y === "top",
      bottom: snackbarState.y === "bottom"
    }
  }

  get text() { return snackbarState.text }

  hide() { snackbarActions.hide() }
}
</script>
