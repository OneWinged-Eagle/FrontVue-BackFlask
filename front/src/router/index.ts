import Vue from "vue"
import Router from "vue-router"

import { userActions } from "@/store/user"
import { lazyLoading } from "./lazyLoading"

Vue.use(Router)

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			name: "All",
			path: "*",
			redirect: "/404"
		},
		{
			name: "NotFound",
			path: "/404",
			component: lazyLoading("errors/NotFound")
		},
		{
			name: "Root",
			path: "/",
			redirect: "/products"
		},
		{
			name: "Login",
			path: "/login",
			component: lazyLoading("Login"),
			meta: {
				guest: true
			}
		},
		{
			path: "/Signup",
			name: "Signup",
			component: lazyLoading("Signup"),
			meta: {
				guest: true
			}
		},
		{
			name: "Products",
			path: "/products",
			component: lazyLoading("Products")
		},
		{
			name: "Product",
			path: "/products/:id",
			component: lazyLoading("Product")
		},
		{
			name: "Map",
			path: "/map",
			component: lazyLoading("Map")
		},
		{
			name: "Users",
			path: "/users",
			component: lazyLoading("Users"),
			meta: {
				admin: true,
				requiresAuth: true
			}
		},
		{
			name: "User",
			path: "/users/:id",
			component: lazyLoading("User"),
			meta: {
				admin: true,
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!userActions.isLogged()) {
			next({
				path: "/login",
				params: { nextUrl: to.fullPath }
			})
		} else {
			if (to.matched.some(record => record.meta.admin)) {
				if (userActions.isAdmin()) {
					next()
				} else {
					next({ name: "Root" })
				}
			} else {
				next()
			}
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (!userActions.isLogged()) {
			next()
		}
		else {
			next({ name: "Root" })
		}
	} else {
		next()
	}
})

export { router }
