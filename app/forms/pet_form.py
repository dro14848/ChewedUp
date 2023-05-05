from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, DateTimeField)
from wtforms.validators import DataRequired

class PetForm(FlaskForm):
    name = StringField("Name", validators=[(DataRequired())])
    breed = StringField("Breed", validators=[(DataRequired())])
    picture = StringField("Picture")
    weight = IntegerField("Weight")
    birthday = StringField("Birthday or Adoption Date")
    submit = SubmitField("Submit")