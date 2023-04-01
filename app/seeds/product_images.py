from app.models import db, Product, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text


def seed_prodImages():
    products = Product.query.all()
    for product in products:
        if product.id == 1:
            image_url= 'https://image.chewy.com/is/image/catalog/68068_MAIN._AC_SL1200_V1628101898_.jpg'
        elif product.id == 2:
            image_url ='https://image.chewy.com/is/image/catalog/53235_MAIN._AC_SL1200_V1658683388_.jpg'
        elif product.id == 3:
            image_url ='https://image.chewy.com/is/image/catalog/150483_MAIN._AC_SL1200_V1545256686_.jpg'
        elif product.id == 4:
            image_url ='https://image.chewy.com/is/image/catalog/80742_MAIN._AC_SL1200_V1633021944_.jpg'
        elif product.id == 5:
            image_url ='https://image.chewy.com/is/image/catalog/150514_MAIN._AC_SL1200_V1545253327_.jpg'
        elif product.id == 6:
            image_url ='https://image.chewy.com/is/image/catalog/62766_MAIN._AC_SL1200_V1588689687_.jpg'
        elif product.id == 7:
            image_url ='https://image.chewy.com/is/image/catalog/53325_MAIN._AC_SL600_V1534449176_.jpg'
        # elif product.id == :
        #     image_url =''
        
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