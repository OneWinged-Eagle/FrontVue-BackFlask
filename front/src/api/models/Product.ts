import { User } from "./User"

interface Location {
	geolocation: [number, number]
	address: string
}

export interface Product {
	_id?: { $oid: string }
	name: string
	description: string
	price: number
	location: Location
	dateAdded?: { $date: number }
	seller?: User
}

export const blankProduct: Product = {
	name: "",
	description: "",
	price: 0,
	location: {
		geolocation: [0, 0],
		address: ""
	}
}
