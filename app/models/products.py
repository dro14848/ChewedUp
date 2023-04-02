from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.cart import cartJoined


class Product(db.Model):
    __tablename__="product"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
    disclaimer = db.Column(db.String(255))
    price = db.Column(db.Float())
    type = db.Column(db.String(50))


    
    reviews = db.relationship("Review", back_populates="product", cascade='all, delete')
    productimages = db.relationship("ProductImages", back_populates="product", cascade='all, delete')
    cartJoined = db.relationship("Cart", back_populates='products', secondary=cartJoined)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'disclaimer': self.disclaimer,
            'price': self.price,
            'type': self.type
        }