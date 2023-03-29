from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
import datetime
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)


# get all reviews 
@review_routes.route('/')
def allReviews():
    all_reviews = Review.query.all()
    reviews = []
    for review in all_reviews:
        reviews.append(review.to_dict())
    return {"Reviews": reviews}