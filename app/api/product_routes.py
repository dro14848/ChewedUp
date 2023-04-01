from flask import Blueprint, jsonify, request
from app.models import db, Product, ProductImages, Review
from app.forms import ReviewForm
from flask_login import login_required, current_user
import datetime


product_routes = Blueprint('products', __name__)

# GET ALL PRODUCTS
@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    allProducts = []
    for product in products:
        pd = product.to_dict()
        pdImages_dict = {'productImages': [productimages.to_dict() for productimages in product.productimages]}
        pd.update(pdImages_dict)
        allProducts.append(pd)
    return {'products': allProducts}

# GET ONE PRODUCT
@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    productimages = product.productimages
    reviews_dict = {'reviews': [reviews.to_dict() for reviews in product.reviews]}
    pdImages_dict = {'productImages': [productimages.to_dict() for productimages in productimages]}
    # image_dict = images.to_dict()
    product_dict = product.to_dict()
    product_dict.update(pdImages_dict)
    product_dict.update(reviews_dict)
    return product_dict


# Add review
@product_routes.route('/<int:id>/reviews', methods =['POST'])
@login_required
def addReview(id):
    data = request.get_json()
    form = ReviewForm()
    date = datetime.datetime.now()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_review = Review.query.filter_by(product_id=data["product_id"], user_id=current_user.id).first()
        if old_review:
            return {"message": "You have already reviewed this product. You can't submit another review"}, 400
        new_review = Review(
            review = data["review"],
            rating = data["rating"],
            product_id = data["product_id"],
            user_id = current_user.id,
            created_at = date
        )
        print(new_review.to_dict())
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return "Error, please check input data", 404