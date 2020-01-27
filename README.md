#### Database quick doc:

##### two collections, users and products:

		users: { email (must be unique), password (hashed), role (either user or admin) }

		products: { name, description, price, location ({ geolocation, address }), dateAdded, seller }

#### API quick doc:

| Route | GET | POST | PUT | DELETE |
| ------ | ------ | ------ | ------ | ------ |
| /auth/signup | - | register a new user and log them | - | - |
| /auth/login | - | log an already existing user | - | - |
| /users | get a list of all users (must be admin) | create a new user (must be admin) | - | - |
| /users/{id} | get this user's data (must be admin) | - | update this user's data if not an admin (must be admin) | delete this user if not an admin (must be admin) |
| /products | get a list of all products | create a new product (must be user or admin) | - | - |
| /products/{id} | get this product's data | - | update this product's data (must be the seller or admin) | delete this product (must be the seller or admin) |
