import Vue from "vue"

import { Storage } from "@/utils/Storage"
import { Role } from "@/api/models/User"

interface UserProps {
	email: string
	role: Role
	token: string
}

const state = Vue.observable<UserProps>({
	email: "",
	role: Role.none,
	token: ""
})

const SET = "SET"

const mutations = {
	[SET]({ email, role, token }: UserProps) {
		state.email = email
		state.role = role
		state.token = token
	}
}

const actions = {
	set(props: UserProps) {
		Storage.set("email", props.email)
		Storage.set("role", props.role)
		Storage.set("token", props.token)
		mutations[SET](props)
	},

	getEmail() {
		if (state.email === "") {
			state.email = Storage.get("email") || ""
		}

		return state.email
	},

	getRole() {
		if (state.role === "") {
			state.role = Storage.get("role") || Role.none
		}

		return state.role
	},

	getToken() {
		if (state.token === "") {
			state.token = Storage.get("token") || ""
		}

		return state.token
	},

	isLogged() {
		return this.getEmail() !== "" && this.getToken() !== ""
	},

	isUser() {
		return this.isLogged() && this.getRole() === Role.user
	},

	isAdmin() {
		return this.isLogged() && this.getRole() === Role.admin
	}
}

export { actions as userActions }
