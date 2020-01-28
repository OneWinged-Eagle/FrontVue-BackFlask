<template>
	<v-container text-xs-center>
		<v-layout wrap>
			<v-flex xs12>
				<h2 class="display-3 font-weight-bold secondary--text">
					4
					<span class="primary--text">0</span>
					4
				</h2>
			</v-flex>

			<v-flex xs12 class="py-3">
				<h6 class="title">Hmm, seems you're lost...</h6>
			</v-flex>

			<v-flex xs12>
				<v-btn color="primary" to="/">Take me Home!</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({
  name: "NotFound"
})
export default class NotFound extends Vue { }
</script>
