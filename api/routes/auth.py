from datetime import timedelta

from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError, ValidationError

from models.user import User


class SignupApi(Resource):

	def post(self):
		try:
			user = User(**request.get_json())
			user.hashPassword()
			user.role = "user"

			user.save()

			token = create_access_token(str(user.id), expires_delta=timedelta(7))
			return {"email": user.email, "role": user.role, "token": token}, 200

		except (FieldDoesNotExist, ValidationError) as e:
			return {"msg": f"The signup request isn't correctly formatted ({e})"}, 400
		except NotUniqueError as e:
			return {"msg": f"This email is already registered ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a post on signup ({e})"}, 500


class LoginApi(Resource):

	def post(self):
		try:
			body = request.get_json()

			if "email" not in body or "password" not in body:
				return {
				    "msg":
				        "The login request is missing critical data (email or password not provided)"
				}, 400

			user = User.objects.get(email=body.email)
			if not user.checkPassword(body.password):
				return {"msg": "The email and password provided don't match"}, 401

			token = create_access_token(str(user.id), expires_delta=timedelta(7))
			return {"email": user.email, "role": user.role, "token": token}, 200

		except DoesNotExist as e:
			return {"msg": f"This email isn't registered ({e})"}, 401
		except Exception as e:
			return {"msg": f"Something went wrong during a post on login ({e})"}, 500
