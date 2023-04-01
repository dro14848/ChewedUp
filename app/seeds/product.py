from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products = [
        Product(
            name ="Lamb Chop Squeaky Plush Dog Toy", description="Lamb Chop will be an instant family fave. Whether you and your pup are playing a frisky game of fetch, launching Lamp Chop high in the air or happily squeaking her, this beloved character brings along instant joy for pups and peeps.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="5.99", type="chew"
        ),
        Product(
            name ="Ultra Rubber Ball Tough Dog Toy", description="Trees, rocks, earth...it doesn't matter what these bouncy balls hit, they're gonna fly! Try the Chuckit! Ultra Rubber ball for hours of fun, with bouncy balls that keep on going long after being flung from the Launcher or thrown.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="8.49", type="chew"
        ),
        Product(
            name ="Floppy Knots Dog Toy, Fox", description="Help your dog spend his boundless reserves of energy with the KONG Floppy Knots Dog Toy. The cute bunny toy features a cheerful, floppy design, perfect for thrashing fun.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="10.99", type="chew"
        ),
        Product(
            name ="Cottonblend 3 Knot Dog Rope Toy", description="Mammoth rope toys are made from premium materials in fun shapes for dogs of all sizes. Rope fibers floss dog's teeth as they chew and play. Rope fibers floss dog's teeth as they chew and play.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="15.59", type="chew"
        ),
        Product(
            name ="SqueakAir Balls Packs Dog Toy", description="Help your dog spend his boundless reserves of energy with the KONG SqueakAir Balls Packs Dog Toy. The durable toy combines the benefits of two classics—a tennis ball and a squeaker toy, so he can be physically and mentally stimulated.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="13.99", type="chew"
        ),
        Product(
            name ="Cozie Elmer the Elephant Dog Toy", description="The KONG Cozies are cute, soft and cuddly plush toys made with an extra layer of material, so they’re extra tough. Cozies are perfect for a game of fetch or as a comfort toy for your furry friend.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="6.99", type="chew"
        ),
       Product(
            name ="Hol-ee Roller Dog Toy", description="Game of fetch? Check. Good for bouncing? Yep, that too. Chew it and stretch it? Sure, why not.",
            disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
            price="9.95", type="chew"
        ),
        # Product(
        #     name ="", description="",
        #     disclaimer= "Every dog plays differently and, since not all toys are created equal, it’s always best to keep a close watch on your pup in case things get ruff. Supervised play will help toys last longer and most importantly keep your pal safe.", 
        #     price="10.99", type="chew"
        # ),
    ]

    for product in products:
        db.session.add(product)
    
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()