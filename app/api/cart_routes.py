from flask import Blueprint, jsonify, request
from app.models import db, Product, Cart
from sqlalchemy.orm import joinedload, session
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

# get cart 
@cart_routes.route('/<int:id>')
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    cartItems = []
    for items in carts:
        allProd = []
        testvar = items.products
        print("ITEMS", testvar)
        for product in items.products:
            productsObj = product.to_dict()
            print("OBJ", productsObj)
            productsObj['productimages'] = []
            for img in product.productimages:
                productsObj['productimages'].append(img.to_dict())
            allProd.append(productsObj)

    cartObj = items.to_dict()
    cartObj.update({"cart": allProd})
    cartItems.append(cartObj)
    cartResult = {
        "cart": cartItems
    }

    return cartResult

# Create cart on user creation
@cart_routes.route('/', methods=["POST"])
def cart_creation():
    user = current_user
    new_cart = Cart(user_id == user.id)
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()

# Add item to cart
@cart_routes.route('/<int:cart_id>/products/<int:product_id>', methods=['POST'])
def addItem(cart_id, product_id):
    cart = Cart.query.get(cart_id)
    product = Product.query.get(product_id)

    for items in cart.products:
        if items.id == product.id:
            return {"error": "Item is already in cart, please modify quantity"}, 400
    
    cart.products.append(product)
    db.session.commit()
    return {"success": "Item added to cart"}

# Delete item in cart
@cart_routes.route('/<int:id>', methods=["DELETE"])
def deleteItem(id):
    body_data = request.get_json()
    cart = Cart.query.get(id)
    if not cart:
        return {'message': 'Cart not found'}, 404
    
    for product in cart.products:
        if product.id == body_data['id']:
            cart.products.remove(product)
    
    # db.session.add(cart)
    db.session.commit()

    cart_obj = cart.to_dict()
    cart_obj['products']= []
    for product in cart.products:
        product_obj = product.to_dict()
        cart_obj['products'].append(product_obj)

    return jsonify(cart_obj)


# Clear Cart
@cart_routes.route('/deletecart', methods=["PUT"])
def clearCart():
    user_id = current_user.id
    cart_id = request.get_json()
    id = cart_id.get('id')
    carts = Cart.query.filter(Cart.id == user_id).all()

    for cart in carts:
        cart.products.clear()
        db.session.commit()
    return {"Cart Cleared": user_id}