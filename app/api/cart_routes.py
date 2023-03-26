from flask import Blueprint, jsonify, request
from app.models import db, Product, Cart
from sqlalchemy.orm import joinedload, session
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

# get cart 
@cart_routes.route('/<int:id>')
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    # cartlog = cart.to_dict()
    cartItems = []
    for items in carts:
        allProd = []
        # print("CART LOOP", items)
        for product in items.products:
            productsObj = product.to_dict()
            allProd.append(productsObj)

    cartObj = items.to_dict()
    cartObj.update({"cart": allProd})
    cartItems.append(cartObj)
    cartResult = {
        "cart": cartItems
    }
    # print("CART ============", cartObj)
    # print("CART ITEMS +++++++++++++++++", cartItems)

    return cartResult

# Create cart on user creation
@cart_routes.route('/', methods=["POST"])
def cart_creation():
    user = current_user
    new_cart = Cart(user_id == user.id)
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()