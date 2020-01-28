import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import { userActions } from "@/store/user"
import { getErrorMessage } from "./getErrorMessage"

export class Axios {
	axiosInstance: AxiosInstance
	url = ""
	loading = false

	constructor(url: string, auth: boolean = false) {
		this.url = url

		let headers: any = {
			"Content-Type": "application/json"
		}
		if (auth && userActions.getToken() !== "") {
			headers.Authorization = `Bearer ${userActions.getToken()}`
		}
		this.axiosInstance = axios.create({
			baseURL: process.env.VUE_APP_API,
			headers
		})

		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			this.loading = true
			console.info("Request started with:", config)
			return config
		},
			(error) => {
				this.loading = false
				console.error("Error during request:", error)
				return Promise.reject(`(on ${this.url}): ${getErrorMessage(error)}`)
			})
		this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
			this.loading = false
			console.info("Response:", response)
			return response.data
		},
			(error) => {
				this.loading = false
				console.error("Error during response:", error)
				return Promise.reject(`(on ${this.url}): ${getErrorMessage(error)}`)
			})
	}
}
