export enum Role {
	none = "",
	user = "user",
	admin = "admin"
}

export interface User {
	_id?: { $oid: string }
	email: string
	password: string // ?
	role: Role
}

export const blankUser: User = {
	email: "",
	password: "",
	role: Role.none
}
