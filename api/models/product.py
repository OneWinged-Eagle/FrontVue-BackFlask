from bson import json_util
from datetime import datetime
from json import loads

from db import db
from .my_query_set import MyQuerySet
from .user import User


class Location(db.EmbeddedDocument):
	geolocation = db.GeoPointField(required=True)
	address = db.StringField(required=True)


class Product(db.Document):
	meta = {"collection": "products", "queryset_class": MyQuerySet}

	name = db.StringField(required=True)
	description = db.StringField(required=True)
	price = db.DecimalField(0, precision=2, required=True)
	location = db.EmbeddedDocumentField(Location, required=True)
	dateAdded = db.DateTimeField(default=datetime.now, required=True)
	seller = db.LazyReferenceField(User, reverse_delete_rule=2, required=True)

	def to_json(self):
		data = self.to_mongo()
		data["seller"] = User(**loads(self.seller.fetch().to_json()))
		return json_util.dumps(data)
