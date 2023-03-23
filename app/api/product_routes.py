from flask import Blueprint, jsonify, request
from app.models import db, Product


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    allProducts = []
    for product in products:
        pd = product.to_dict()
        pdImages = {'productImages': [productimages.to_dict() for productimages in product.productimages]}
        pd.update(pdImages)
        allProducts.append(pd)
    return {'products': allProducts}