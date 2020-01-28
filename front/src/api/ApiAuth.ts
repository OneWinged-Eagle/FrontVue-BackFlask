import { Axios } from "./Axios"
import { snackbarActions } from "@/store/snackbar"
import { userActions } from "@/store/user"
import { router } from "@/router/"
import { Role } from "./models/User"

interface Response {
	email: string
	role: Role
	token: string
}

export class ApiAuth extends Axios {
	constructor() {
		super("auth")
	}

	signup(email: string, password: string) {
		console.info(`Signing up ${email}...`)

		return this.axiosInstance
			.post<Response>(`/${this.url}/signup`, { email, password })
			.then((response) => {
				console.info(`${response.email} signed up!`)

				userActions.set(response)
				router.push(router.currentRoute.params.nextUrl || { name: "Root" })
				snackbarActions.show({ text: "Welcome!" })
			}).catch((error) => {
				snackbarActions.show({ color: "warning", text: `Signup failed ${error}`, timeout: 0 })
			})
	}

	login(email: string, password: string) {
		console.info(`Logging in ${email}...`)

		return this.axiosInstance
			.post<Response>(`/${this.url}/login`, { email, password })
			.then((response) => {
				console.info(`${response.email} logged in!`)

				userActions.set(response)
				router.push(router.currentRoute.params.nextUrl || { name: "Root" })
				snackbarActions.show({ text: "Welcome back!" })
			}).catch((error) => {
				snackbarActions.show({ color: "warning", text: `Login failed ${error}`, timeout: 0 })
			})
	}
}
