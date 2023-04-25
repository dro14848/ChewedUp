from .db import db, environment, SCHEMA, add_prefix_for_prod


class PetProfile(db.Model):
    __tablename__="petprofile"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column()
    breed = db.Column()
    picture = db.Column()
    weight = db.Column()
    gender = db.Column()
    birthday = db.Column()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'breed': self.breed,
            'picture': self.picture,
            'weight': self.weight,
            'gender': self.gender,
            'birthday': self.birthday
        }