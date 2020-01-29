from flask import request, Response
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, InvalidQueryError, NotUniqueError, ValidationError

from models.user import User


class UsersApi(Resource):

	@jwt_required
	def get(self):
		try:
			me = User.objects.get(id=get_jwt_identity())
			if me.role != "admin":
				return {"msg": "Can't retrieve users"}, 403

			return Response(
			    User.objects.all().to_json(), 200, mimetype="application/json")

		except Exception as e:
			return {"msg": f"Something went wrong during a get on users ({e})"}, 500

	@jwt_required
	def post(self):
		try:
			me = User.objects.get(id=get_jwt_identity())
			if me.role != "admin":
				return {"msg": "Can't create user"}, 403

			user = User(**request.get_json())
			user.hashPassword()
			user.role = "user"

			user.save()

			return Response(user.to_json(), 200, mimetype="application/json")

		except (FieldDoesNotExist, ValidationError) as e:
			return {"msg": f"The user isn't correctly formatted ({e})"}, 400
		except NotUniqueError as e:
			return {"msg": f"This user already exists ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a post on users ({e})"}, 500


class UserApi(Resource):

	@jwt_required
	def get(self, id):
		try:
			me = User.objects.get(id=get_jwt_identity())
			if me.role != "admin":
				return {"msg": "Can't retrieve user"}, 403

			return Response(
			    User.objects.get(id=id).to_json(), 200, mimetype="application/json")

		except DoesNotExist as e:
			return {"msg": f"This user doesn't exist ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a get on user ({e})"}, 500

	@jwt_required
	def put(self, id):
		try:
			me = User.objects.get(id=get_jwt_identity())
			if me.role != "admin":
				return {"msg": "Can't update this user"}, 403

			userToUpdate = User.objects.get(id=id)
			if userToUpdate.role == "admin":
				return {"msg": "Can't update an admin"}, 403

			body, password = request.get_json(), userToUpdate.password

			if "password" in body:
				password = generate_password_hash(body.password).decode("utf8")

			User.objects.get(id=id).update(
			    email=body.get("email", userToUpdate.email), password=password)

			return Response(
			    User.objects.get(id=id).to_json(), 200, mimetype="application/json")

		except (FieldDoesNotExist, ValidationError) as e:
			return {"msg": f"The user isn't correctly formatted ({e})"}, 400
		except DoesNotExist as e:
			return {"msg": f"This user doesn't exist ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a put on user ({e})"}, 500

	@jwt_required
	def delete(self, id):
		try:
			me = User.objects.get(id=get_jwt_identity())
			if me.role != "admin":
				return {"msg": "Can't delete this user"}, 403

			user = User.objects.get(id=id)
			if user.role == "admin":
				return {"msg": "Can't delete an admin"}, 403

			user.delete()
			return "", 200

		except DoesNotExist as e:
			return {"msg": f"This user doesn't exist ({e})"}, 400
		except Exception as e:
			return {"msg": f"Something went wrong during a delete on user ({e})"}, 500
