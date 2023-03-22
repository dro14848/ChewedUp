from app.models import db, Product, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text


def seed_prodImages():
    products = Product.query.all()
    for product in products:
        if product.id == 1:
            image_url= 'https://image.chewy.com/is/image/catalog/53259_MAIN._AC_SS108_V1602320474_.jpg'
        elif product.id == 2:
            image_url ='https://image.chewy.com/is/image/catalog/53238_MAIN._AC_SS600_V1602337265_.jpg'
        elif product.id == 3:
            image_url ='https://image.chewy.com/is/image/catalog/53352_MAIN._AC_SS232_V1534449202_.jpg'
        elif product.id == 4:
            image_url ='https://image.chewy.com/is/image/catalog/71968_MAIN._AC_SY232_V1612404735_.jpg'
        else:
            continue
        product_image = ProductImages(
            image = image_url,
            product_id = product.id
        )
        db.session.add(product_image)
    db.session.commit()


def undo_productImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productImages"))

    db.session.commit()