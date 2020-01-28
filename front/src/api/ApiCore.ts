import Vue from "vue"

import { Axios } from "./Axios"
import { snackbarActions } from "@/store/snackbar"

export class ApiCore<T> extends Axios {
	items: T[] = []
	item: T = {} as T

	constructor(collection: string) {
		super(collection, true)
	}

	/* Create */
	insert(item: T) {
		console.info("Inserting item...")

		return this.axiosInstance
			.post<T>(`/${this.url}`, item)
			.then((item) => {
				console.info("Item inserted!")

				this.items.unshift(item)
				snackbarActions.show({ text: `New item added in ${this.url}!` })
			})
			.catch((error) => {
				snackbarActions.show({ color: "warning", text: `Insert failed ${error}`, timeout: 0 })
			})
	}

	/* Read */
	getAll() {
		console.info("Fetching items...")

		return this.axiosInstance
			.get<T[]>(`/${this.url}`)
			.then((items) => {
				console.info(`${items.length} items fetched!`)

				this.items = items || []
			})
			.catch((error) => {
				snackbarActions.show({ color: "warning", text: `GetAll failed ${error}`, timeout: 0 })
			})
	}

	getOne(id: string) {
		console.info(`Fetching item ${id}...`)

		return this.axiosInstance
			.get<T>(`/${this.url}/${id}`)
			.then((item) => {
				console.info("Item fetched!")

				this.item = item || {} as T
			})
			.catch((error) => {
				snackbarActions.show({ color: "warning", text: `GetOne failed ${error}`, timeout: 0 })
			})
	}

	/* Update */
	update(id: string, item: T) {
		console.info(`Updating item ${id}...`)

		return this.axiosInstance
			.put<T>(`/${this.url}/${id}`, item)
			.then((item) => {
				console.info("Item updated!")

				this.item = item
				snackbarActions.show({ text: `Item [${id}] updated in ${this.url}!` })
			})
			.catch((error) => {
				snackbarActions.show({ color: "warning", text: `Update failed ${error}`, timeout: 0 })
			})
	}

	/* Delete */
	delete(id: string) {
		console.info(`Deleting item ${id}...`)

		return this.axiosInstance
			.delete(`/${this.url}/${id}`)
			.then(() => {
				console.info("Item deleted!")

				snackbarActions.show({ text: `Item [${id}] deleted from ${this.url}!` })
			})
			.catch((error) => {
				snackbarActions.show({ color: "warning", text: `Delete failed ${error}`, timeout: 0 })
			})
	}
}
