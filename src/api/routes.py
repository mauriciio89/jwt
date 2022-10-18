"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

#create flask app
api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    usuario_query = User.query.filter_by(email=email, password=password).first()
    if not usuario_query: 
        return jsonify({"msg": "Bad username or password"}), 401
    # if email != "test" or password != "test":
        # return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=usuario_query.email)
    response_body = {
        "msg": "bienvenido",
        "accessToken": access_token,
        "id": usuario_query.id
    }
    return jsonify(response_body), 200



