from flask.cli import AppGroup
from .users import seed_users, undo_users
from .product import seed_products, undo_products
from .product_images import seed_prodImages, undo_productImages
from .cart import seed_cart, undo_cart

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_products()
        undo_productImages()
        undo_cart()
    seed_users()
    seed_products()
    seed_prodImages()
    seed_cart()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_products()
    undo_productImages()
    undo_cart()
    # Add other undo functions here