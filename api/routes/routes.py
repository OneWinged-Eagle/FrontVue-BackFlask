from flask_restful import Api

from .auth import SignupApi, LoginApi
from .products import ProductsApi, ProductApi
from .users import UsersApi, UserApi


def initRoutes(api: Api):
	api.add_resource(SignupApi, "/auth/signup")
	api.add_resource(LoginApi, "/auth/login")

	api.add_resource(ProductsApi, "/products")
	api.add_resource(ProductApi, "/products/<id>")

	api.add_resource(UsersApi, "/users")
	api.add_resource(UserApi, "/users/<id>")
