from .db import db, environment, SCHEMA, add_prefix_for_prod


class PetProfile(db.Model):
    __tablename__="petprofile"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)


    def to_dict(self):
        return {
            'id': self.id
        }