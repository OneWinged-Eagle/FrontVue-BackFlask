from db import db


class MyQuerySet(db.QuerySet):

	def to_json(self):
		return f"[{','.join(doc.to_json() for doc in self)}]"
