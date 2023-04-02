from app.models import Cart, db, environment, SCHEMA, Product
from sqlalchemy.sql import text
from random import choice



def seed_cart():
    products = Product.query.all()

    cart1 = Cart(user_id=1, products=[choice(products)])
    cart2 = Cart(user_id=2, products=[choice(products)])
    cart3 = Cart(user_id=3, products=[choice(products)])
    cart4 = Cart(user_id=4)
    cart5 = Cart(user_id=5)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.add(cart5)
    db.session.commit()

    print("Cart seeded!")

def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart"))

    db.session.commit()