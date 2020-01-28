<template>
	<v-footer app height="auto" inset>
		<v-layout align-center justify-space-between>
			<span class="caption">
				<v-icon small>mdi-code-braces</v-icon>with
				<v-icon color="red" small>mdi-heart</v-icon>by
				<a href="https://github.com/OneWinged-Eagle" target="_blank">OneWinged-Eagle</a>
			</span>

			<v-spacer />

			<a href="https://git.toptal.com/screening/guillaume-szwankowski/" target="_blank">
				<v-icon small>mdi-gitlab</v-icon>
			</a>
		</v-layout>
	</v-footer>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({
  name: "Footer"
})
export default class Footer extends Vue {
}
</script>
