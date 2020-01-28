import { User } from "./models/User"
import { ApiCore } from "./ApiCore"

export class ApiUsers extends ApiCore<User> {
	constructor() {
		super("users")
	}
}
