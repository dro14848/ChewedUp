from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float
from app.models.products import Product

class ProductImages(db.Model):
    __tablename__='productimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')), nullable=False)
    product = db.relationship("Product", back_populates="productimages")

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'product_id': self.product_id
        }
