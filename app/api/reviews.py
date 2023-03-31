from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
from app.forms import ReviewForm
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


# add review
@review_routes.route('/', methods=['POST'])
@login_required
def addReview():
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
    

# delete review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):
    review = Review.query.get(id)
    if not review:
        return ("Review not found"), 404

    if review.user_id != current_user.id:
        return {"error": "You did not post this review"}, 401

    db.session.delete(review)
    db.session.commit()

    return {"Review Deleted!": id}