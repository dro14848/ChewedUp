from app.models import db, Review, environment, SCHEMA
from sqlalchemy import text
import datetime

def seed_reviews():
    reviews = [
        Review(
        user_id = 1, product_id = 2, review ="Test review 1", rating = 5, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 2, product_id = 2, review ="Test review 2", rating = 3, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 3, product_id = 2, review ="Test review 3", rating = 1, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 1, product_id = 1, review ="Test review 1", rating = 5, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 2, product_id = 1, review ="Test review 2", rating = 3, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 3, product_id = 1, review ="Test review 3", rating = 1, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 1, product_id = 3, review ="Test review 1", rating = 5, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 2, product_id = 3, review ="Test review 2", rating = 3, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 3, product_id = 3, review ="Test review 3", rating = 1, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 1, product_id = 4, review ="Test review 1", rating = 5, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 2, product_id = 4, review ="Test review 2", rating = 3, created_at=datetime.datetime.now()
        ),
        Review(
        user_id = 3, product_id = 4, review ="Test review 3", rating = 1, created_at=datetime.datetime.now()
        ),

    ]

    for review in reviews:
        db.session.add(review)
    
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()