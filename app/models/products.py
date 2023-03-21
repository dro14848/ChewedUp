from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Product(db.Model):
    __tablename__="product"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(255))
    price = db.Colum(db.Float())
    type = db.Colum(db.String(50))


    
    reviews = db.relationship("Review", back_populates="product", cascade='all, delete')
    productimages = db.relationship("ProductImages", back_populates="product", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'type': self.type
        }