import Vue from "vue"
import Component from "vue-class-component"

import { ApiCore } from "@/api/ApiCore"

// You can declare a mixin as the same style as components.
@Component
export default class Solo extends Vue {
	apiCore!: ApiCore<any>

	get item() {
		return this.apiCore.item
	}

	created() {
		this.apiCore.getOne(this.$route.params.id)
	}
}
