from os import environ

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api

from db import initDb
from routes.routes import initRoutes

application = Flask(__name__)
CORS(application)

application.config["JWT_SECRET_KEY"] = environ["FLASK_JWT_SECRET"]
application.config["MONGODB_SETTINGS"] = {
    "host":
        f"mongodb://{environ['MONGO_USERNAME']}:{environ['MONGO_PASSWORD']}@{environ['MONGO_HOST']}:{environ['MONGO_PORT']}/{environ['MONGO_DBNAME']}"
}

api = Api(application)
bcrypt = Bcrypt(application)
jwt = JWTManager(application)

initDb(application)

initRoutes(api)

if __name__ == "__main__":
	ENVIRONMENT_DEBUG = environ.get("FLASK_ENV", "production") == "development"
	ENVIRONMENT_PORT = environ.get("FLASK_PORT", 4242)
	application.run("0.0.0.0", ENVIRONMENT_PORT, ENVIRONMENT_DEBUG)
