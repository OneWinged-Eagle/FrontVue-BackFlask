Database quick doc:
	two collections, users and products
		users: { email (must be unique), password (hashed), role (either user or admin) }

		products: { name, description, price, location ({ geolocation, address }), dateAdded, seller }

API quick doc:
	/auth/signup
		POST: register a new user and log them

	/auth/login
		POST: log an already existing user

	/users
		GET: get a list of all users (must be admin)
		POST: create a new user (must be admin)

	/users/{id}
		GET: get this user's data (must be admin)
		PUT: update this user's data if not an admin (must be admin)
		DELETE: delete this user if not an admin (must be admin)

	/products
		GET: get a list of all products
		POST: create a new product (must be user or admin)

	/products/{id}
		GET: get this product's data
		PUT: update this product's data (must be the seller or admin)
		DELETE: delete this product (must be the seller or admin)
