from bson import json_util

from flask_bcrypt import check_password_hash, generate_password_hash

from db import db


class User(db.Document):
	meta = {"collection": "users"}

	email = db.EmailField(required=True, unique=True)
	password = db.StringField(required=True)
	role = db.StringField(required=True, choices=("user", "admin"))

	def to_json(self):
		data = self.to_mongo()
		del data.password
		return json_util.dumps(data)

	def hashPassword(self):
		self.password = generate_password_hash(self.password).decode("utf8")

	def checkPassword(self, password):
		return check_password_hash(self.password, password)
