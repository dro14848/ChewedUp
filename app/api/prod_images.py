from flask import Blueprint, jsonify, request
from app.models import Product, db, ProductImages
from flask_login import login_required, current_user


productImages_routes = Blueprint('productImages', __name__)


@productImages_routes.route('/<int:id>')
def imagesById(id):
    images = ProductImages.query.get(id)
    return images.to_dict()