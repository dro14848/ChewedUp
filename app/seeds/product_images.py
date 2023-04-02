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
        elif product.id == 8:
            image_url ='https://image.chewy.com/is/image/catalog/90246_MAIN._AC_SL1200_V1527093482_.jpg'
        elif product.id == 9:
            image_url ='https://image.chewy.com/is/image/catalog/546766_MAIN._AC_SL1200_V1670608494_.jpg'
        elif product.id == 10:
            image_url ='https://image.chewy.com/is/image/catalog/242159_MAIN._AC_SL1200_V1603373495_.jpg'
        elif product.id == 11:
            image_url ='https://image.chewy.com/is/image/catalog/145541_MAIN._AC_SL1200_V1630456889_.jpg'
        elif product.id == 12:
            image_url ='https://image.chewy.com/is/image/catalog/68144_PT1._AC_SL1200_V1530911461_.jpg'
        elif product.id == 13:
            image_url ='https://image.chewy.com/is/image/catalog/532310_MAIN._AC_SL1200_V1657658630_.jpg'
        elif product.id == 14:
            image_url ='https://image.chewy.com/is/image/catalog/161311_MAIN._AC_SL1200_V1677534736_.jpg'
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