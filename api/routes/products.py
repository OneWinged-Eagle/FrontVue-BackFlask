from datetime import datetime

from flask import request, Response
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, InvalidQueryError, NotUniqueError, ValidationError

from models.product import Product
from models.user import User


class ProductsApi(Resource):

	def get(self):
		try:
			return Response(
			    Product.objects().to_json(), 200, mimetype="application/json")

		except Exception as e:
			return {
			    "msg": f"Something went wrong during a get on products ({e})"
			}, 500

	@jwt_required
	def post(self):
		try:
			me, product = User.objects.get(id=get_jwt_identity()), Product(
			    **request.get_json())

			product.dateAdded = datetime.now
			product.seller = me.id

			product.save()
			return Response(product.to_json(), 200, mimetype="application/json")

		except (FieldDoesNotExist, ValidationError) as e:
			return {"msg": f"The product isn't correctly formatted ({e})"}, 400
		except NotUniqueError as e:
			return {"msg": f"This product already exists ({e})"}, 400
		except Exception as e:
			return {
			    "msg": f"Something went wrong during a post on products ({e})"
			}, 500


class ProductApi(Resource):

	def get(self, id):
		try:
			return Response(
			    Product.objects.get(id=id).to_json(),
			    200,
			    mimetype="application/json")

		except DoesNotExist as e:
			return {"msg": f"This product doesn't exist ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a get on product ({e})"}, 500

	@jwt_required
	def put(self, id):
		try:
			me, body, product = User.objects.get(
			    id=get_jwt_identity()), request.get_json(), Product.objects.get(id=id)

			if me.role != "admin" or me.id != product.seller.fetch().id:
				return {"msg": f"Can't update this product"}, 403

			product.update(
			    name=body.get("name", product.name),
			    description=body.get("description", product.description),
			    price=body.get("price", product.price),
			    location=body.get("location", product.location))

			return Response(
			    Product.objects.get(id=id).to_json(),
			    200,
			    mimetype="application/json")

		except (FieldDoesNotExist, ValidationError) as e:
			return {"msg": f"The product isn't correctly formatted ({e})"}, 400
		except DoesNotExist as e:
			return {"msg": f"This product doesn't exist ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a put on product ({e})"}, 500

	@jwt_required
	def delete(self, id):
		try:
			me, product = User.objects.get(
			    id=get_jwt_identity()), Product.objects.get(id=id)

			if me.role != "admin" or me.id != product.seller.fetch().id:
				return {"msg": "Can't delete this product"}, 403

			product.delete()
			return "", 200
		except DoesNotExist as e:
			return {"msg": f"This product doesn't exist ({e})"}, 400
		except Exception as e:
			return {
			    "msg": f"Something went wrong during a delete on product ({e})"
			}, 500
