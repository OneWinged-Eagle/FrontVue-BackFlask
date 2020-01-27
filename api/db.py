from flask import Flask
from flask_mongoengine import MongoEngine

db = MongoEngine()


def initDb(application: Flask):
	db.init_app(application)
