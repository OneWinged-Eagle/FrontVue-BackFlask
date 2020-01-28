<template>
	<v-card class="elevation-12" width="100%">
		<v-data-iterator
			:items="apiCore.items"
			:items-per-page.sync="itemsPerPage"
			:loading="apiCore.loading"
			:page="page"
			:search="search"
			:sort-by="sortBy"
			:sort-desc="sortDesc"
			hide-default-footer
		>
			<template #header>
				<v-toolbar dark color="blue darken-3" class="mb-1">
					<v-text-field
						v-model="search"
						clearable
						flat
						solo-inverted
						hide-details
						prepend-inner-icon="mdi-magnify"
						label="Search"
					/>
					<template v-if="$vuetify.breakpoint.mdAndUp">
						<v-spacer />
						<v-select
							v-model="sortBy"
							flat
							solo-inverted
							hide-details
							:items="fields"
							prepend-inner-icon="mdi-magnify"
							label="Sort by"
						/>
						<v-spacer />
						<v-btn-toggle v-model="sortDesc" mandatory>
							<v-btn large depressed color="blue" :value="false">
								<v-icon>mdi-arrow-up</v-icon>
							</v-btn>
							<v-btn large depressed color="blue" :value="true">
								<v-icon>mdi-arrow-down</v-icon>
							</v-btn>
						</v-btn-toggle>
					</template>
				</v-toolbar>
			</template>

			<template #default="props">
				<v-row>
					<v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
						<slot name="item" :item="item" :sort-by="sortBy" />
					</v-col>
				</v-row>
			</template>

			<template #footer>
				<v-row class="mt-2 mx-1" align="center" justify="center">
					<span class="grey--text">Items per page</span>
					<v-menu offset-y>
						<template #activator="{ on }">
							<v-btn dark text color="primary" class="ml-2" v-on="on">
								{{ itemsPerPage }}
								<v-icon>mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								v-for="(number, index) in [4, 8, 12]"
								:key="index"
								@click="updateItemsPerPage(number)"
							>
								<v-list-item-title>{{ number }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>

					<v-spacer />

					<slot name="action" />

					<v-spacer />

					<span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
					<v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-row>
			</template>
		</v-data-iterator>
	</v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { ApiCore } from "@/api/ApiCore"

@Component({
  name: "DataIterator",
  props: {
    apiCore: { type: ApiCore, required: true },
    fields: { type: Array, required: true }
  }
})
export default class Products extends Vue {
  apiCore!: ApiCore<any>
  fields!: string[]
  search = ""
  sortDesc = false
  page = 1
  itemsPerPage = 4
  sortBy = this.fields[0]

  created() {
    this.apiCore.getAll()
  }

  get numberOfPages() {
    return Math.ceil(this.apiCore.items.length / this.itemsPerPage)
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) { this.page++ }
  }

  formerPage() {
    if (this.page - 1 >= 1) { this.page-- }
  }

  updateItemsPerPage(nb: number) {
    this.itemsPerPage = nb
  }
}
</script>
