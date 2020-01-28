import { Product } from "./models/Product"
import { ApiCore } from "./ApiCore"

export class ApiProducts extends ApiCore<Product> {
	constructor() {
		super("products")
	}
}
