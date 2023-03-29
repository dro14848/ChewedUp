from flask import Blueprint, jsonify, request
from app.models import db, Product, ProductImages, Review


product_routes = Blueprint('products', __name__)

# GET ALL PRODUCTS
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

# GET ONE PRODUCT
@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    images = ProductImages.query.get(id)
    # reviews = Review.query.get(id)
    reviews_dict = {'reviews': [reviews.to_dict() for reviews in product.reviews]}
    image_dict = images.to_dict()
    product_dict = product.to_dict()
    product_dict.update(image_dict)
    product_dict.update(reviews_dict)
    return product_dict