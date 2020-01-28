<template>
	<v-dialog v-model="dialog" max-width="60vw">
		<template #activator="{ on }">
			<v-btn slot="activator" color="error" dark v-on="on">{{ btnTxt }}</v-btn>
		</template>

		<v-card>
			<v-card-title class="error">
				<h5 class="headline">{{ title }}</h5>
			</v-card-title>

			<v-card-text>
				<b>{{ text }}</b>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn color="success" text @click="$emit('false'); dialog = false">{{ falseTxt }}</v-btn>

				<v-btn color="error" text @click="$emit('true'); dialog = false">{{ trueTxt }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({
  name: "BooleanModal",
  props: {
    btnTxt: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    falseTxt: { type: String, required: true },
    trueTxt: { type: String, required: true }
  }
})
export default class BooleanModal extends Vue {
  dialog = false
}
</script>
