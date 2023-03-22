from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products = [
        Product(
            name ="test Product 1", description="test description 1", price="10.99", type="chew"
        ),
        Product(
            name ="test Product 2", description="test description 2", price="10.99", type="chew"
        ),
        Product(
            name ="test Product 3", description="test description 3", price="10.99", type="chew"
        ),
        Product(
            name ="test Product 4", description="test description 4", price="10.99", type="chew"
        ),
    ]

    for product in products:
        db.session.add(product)
    
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()