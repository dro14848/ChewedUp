from .db import db, environment, SCHEMA, add_prefix_for_prod


class Pet(db.Model):
    __tablename__="pets"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    breed = db.Column(db.String(100))
    picture = db.Column(db.String(100))
    weight = db.Column(db.Integer)
    birthday = db.Column(db.String(), nullable=False)
    owner =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


    user = db.relationship("User", back_populates='pets')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'breed': self.breed,
            'picture': self.picture,
            'weight': self.weight,
            'birthday': self.birthday,
            'owner': self.owner
        }