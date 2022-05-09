from flask import Flask, jsonify, request

from backend.controller.cart import CartController
from backend.controller.globalstatistics import GlobalController
from backend.controller.orders import OrderController
from backend.controller.parts import PartController
from backend.controller.user import UserController
from backend.controller.wishlist import WishListController

app = Flask(__name__)

"""
    ROUTE TO HOME PAGE.
"""


@app.route('/')
def handler():
    return 'Root route. Hello, user!'


"""
    ROUTE TO VIEW ALL PARTS FROM THE DATABASE.
"""


@app.route('/CoquiProgramming/Parts', methods=['GET', 'POST', 'DELETE'])
def parts_handler():
    if request.method == 'GET':
        return PartController().getAllParts()
    elif request.method == 'POST':
        return PartController().newPart(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW A SPECIFIC PART GIVEN ITS PART ID.
"""


@app.route('/CoquiProgramming/Parts/<int:part_id>', methods=['GET', 'PUT', 'DELETE'])
def parts_by_id_handler(part_id):
    if request.method == 'GET':
        return PartController().getPartById(part_id)
    elif request.method == 'PUT':
        return PartController().updatePart(part_id, request.json)
    elif request.method == 'DELETE':
        return PartController().deletePart(part_id, request.json)
    else:
        return jsonify("Not Supported"), 405


"""
    ROUTE TO VIEW ALL PARTS FROM A GIVEN SPECIFIED CATEGORY.
"""


@app.route('/CoquiProgramming/Parts/<string:cat_name>', methods=['GET'])
def parts_by_cat_name_handler(cat_name):
    if request.method == 'GET':
        return PartController().getPartByCatname(cat_name)

    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to page with filtered parts by prices less than or equal to desired price.
    ROUTE TO PAGE WITH PARTS FILTERED BY PRICES LESS THAN OR EQUAL TO A GIVEN PRICE BY THE USER.
"""


@app.route('/CoquiProgramming/Parts/Filter/PriceLessThan/<string:part_price>', methods=['GET'])
def parts_by_price_less_than_equal_to(part_price):
    if request.method == 'GET':
        return PartController().getPartsByPriceLessThanOrEqualTo(part_price)
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    ROUTE TO ACCESS PARTS ORDERED IN ASCENDING ORDER (A-Z).
"""


@app.route('/CoquiProgramming/Parts/OrderedAsc', methods=['GET'])
def parts_by_name_ascending():
    if request.method == 'GET':
        return PartController().order_parts_by_name()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    ROUTE TO ACCESS PARTS ORDERED IN DESCENDING ORDER (Z-A).
"""


@app.route('/CoquiProgramming/Parts/OrderedDesc', methods=['GET'])
def parts_by_name_descending():
    if request.method == 'GET':
        return PartController().order_parts_by_name_desc()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    ROUTE TO ACCESS PARTS ORDERED IN ASCENDING ORDER BY THEIR PRICE.
"""


@app.route('/CoquiProgramming/Parts/OrderedAscByPrice', methods=['GET'])
def parts_by_price_ascending():
    if request.method == 'GET':
        return PartController().order_parts_by_price()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    ROUTE TO ACCESS PARTS ORDERED IN DESCENDING ORDER BY THEIR PRICE. 
"""


@app.route('/CoquiProgramming/Parts/OrderedDescByPrice', methods=['GET'])
def parts_by_price_descending():
    if request.method == 'GET':
        return PartController().order_parts_by_price_desc()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    ROUTE TO VIEW ALL USERS REGISTERED IN THE DATABASE, UPDATE USER INFORMATION, CREATE NEW USER, OR DELETE USER.
    
    ...
    Example (POST):
        {
            "Admin ID": 1,
            "user_password": "userpassword",
            "user_email": "useremail",
            "full_name": "user's full name",
            "balance": 1000 (can be any double precision number),
            "user_rol": "false", (false if this user cannot have admin privileges, true otherwise)
        }
    ...
    
"""


@app.route('/CoquiProgramming/User', methods=['GET', 'POST', 'PUT', 'DELETE'])
def user_handler():
    if request.method == 'GET':
        return UserController().getAllUser()
    elif request.method == 'POST':
        return UserController().newUser(request.json)
    elif request.method == 'PUT':
        return UserController().updateUser(request.json)
    elif request.method == 'DELETE':
        return UserController().deleteUserById(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW USER INFORMATION GIVEN THEIR ID.
"""


@app.route('/CoquiProgramming/User/<int:user_id>', methods=['GET'])
def get_user_by_id_handler(user_id):
    if request.method == 'GET':
        return UserController().getUserById(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW THE MOST BOUGHT PART BY A SPECIFIC USER.
"""


@app.route('/CoquiProgramming/User/topPartBought/<int:user_id>', methods=['GET'])
def get_most_bought_part_by_user(user_id):
    if request.method == 'GET':
        return UserController().getMostBoughtPartUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW THE TOP CATEGORY OF PARTS WHERE A SPECIFIC USER BUYS FROM.
"""


@app.route('/CoquiProgramming/User/topCatBought/<int:user_id>', methods=['GET'])
def get_top_cat_bought_by_user(user_id):
    if request.method == 'GET':
        return UserController().getMostBoughtCategoryUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW THE MOST EXPENSIVE BOUGHT BY A SPECIFIC USER.
"""


@app.route('/CoquiProgramming/User/mostExpensivePart/<int:user_id>', methods=['GET'])
def get_most_expensive_part_bought_by_user(user_id):
    if request.method == 'GET':
        return UserController().getMostExpensivePartUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW THE CHEAPEST PART BOUGHT BY A SPECIFIC USER.
"""


@app.route('/CoquiProgramming/User/CheapestPart/<int:user_id>', methods=['GET'])
def get_cheapest_part_bought_by_user(user_id):
    if request.method == 'GET':
        return UserController().getCheapestPartUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW ALL ORDERS.
"""


@app.route('/CoquiProgramming/Order', methods=['GET', 'PUT'])
def order_handler():
    if request.method == 'GET':
        return OrderController().getAllOrders()

    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO GET ORDER INFO GIVEN THE ORDER ID.
"""


@app.route('/CoquiProgramming/Order/<int:order_id>', methods=['GET'])
def order_by_id_handler(order_id):
    if request.method == 'GET':
        return OrderController().getOrderInfoById(order_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO DELETE ORDER.
"""


@app.route('/CoquiProgramming/Order', methods=['DELETE'])
def delete_order_handler():
    if request.method == 'DELETE':
        return OrderController().deleteOrder(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW ALL ORDERS BY A SPECIFIED USER WITH USER_ID.
"""


@app.route('/CoquiProgramming/Order/getOrders/<int:user_id>', methods=['GET'])
def order_by_user_handler(user_id):
    if request.method == 'GET':
        return OrderController().getOrderByUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO CREATE NEW ORDER GIVEN THE USER ID.
"""


@app.route('/CoquiProgramming/newOrder/<int:user_id>', methods=['GET', 'PUT', 'POST'])
def create_order_handler(user_id):
    if request.method == 'POST':
        return OrderController().createOrder(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO ADD PART TO CART.
    
    ...
    Example (POST):
        {
            "user_id": <id>,
            "part_id": <part id>, 
            "quantity": <quantity to buy>
        }
    ...
"""


@app.route('/CoquiProgramming/Cart', methods=['POST', 'DELETE'])
def cart_handler():
    if request.method == 'POST':
        return CartController().newPart(request.json)
    if request.method == 'DELETE':
        return CartController().deletePartFromCart(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO REMOVE PART FROM CART
"""

"""
    ROUTE TO CLEAR USER CART.
"""


@app.route('/CoquiProgramming/Cart/<int:user_id>/', methods=['DELETE'])
def cart_clear_all_parts_handler(user_id):
    if request.method == 'DELETE':
        return CartController().clearAllPartsFromCart(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW USER CART.
"""


@app.route('/CoquiProgramming/ViewCart/<int:user_id>/', methods=['GET'])
def view_user_cart(user_id):
    if request.method == 'GET':
        return CartController().viewCart(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO ADD PART TO WISHLIST.
    
    ...
    Example (POST):
        {
            "user_id": <id>, 
            "part_id": <part_id"
        }
    ...
    
"""


@app.route('/CoquiProgramming/WishList', methods=['POST', 'DELETE'])  # checked works
def wishlist_handler():
    if request.method == 'POST':
        return WishListController().addPartToWishList(request.json)
    elif request.method == 'DELETE':
        return WishListController().deletePartFromWishList(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO CLEAR WISHLIST OF USER.
"""


@app.route('/CoquiProgramming/WishList/Clear/<int:user_id>/', methods=['DELETE'])
def wishlist_clear_all_parts_handler(user_id):
    if request.method == 'DELETE':
        return WishListController().clearAllPartsFromWishList(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO VIEW WISHLIST.
"""


@app.route('/CoquiProgramming/WishList/View/<int:user_id>/', methods=['GET'])  # checked works
def view_user_wishlist(user_id):
    if request.method == 'GET':
        return WishListController().viewWishList(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE GLOBAL RANKS.
    
    MOST EXPENSIVE.
"""


@app.route('/CoquiProgramming/GlobalRank/MostExpensive', methods=['GET'])
def get_most_expensive_handler():
    if request.method == 'GET':
        return GlobalController().getMostExpensive()
    else:
        return jsonify("Method Not Supported"), 405


"""
    CHEAPEST PART
"""


@app.route('/CoquiProgramming/GlobalRank/Cheapest', methods=['GET'])
def get_cheapest_handler():
    if request.method == 'GET':
        return GlobalController().getCheapest()
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TO MOST LIKED PARTS
"""


@app.route('/CoquiProgramming/GlobalRank/MostLiked', methods=['GET'])
def get_most_liked_handler():
    if request.method == 'GET':
        return GlobalController().getMostLiked()
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TOP PRODUCT BOUGHT
"""


@app.route('/CoquiProgramming/GlobalRank/topProductBought', methods=['GET'])
def get_top_product_bought_handler():
    if request.method == 'GET':
        return GlobalController().getTopProductBought()
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE TOP CATEGORY BOUGHT
"""


@app.route('/CoquiProgramming/GlobalRank/topCatBought', methods=['GET'])
def get_top_cat_bought_handler():
    if request.method == 'GET':
        return GlobalController().getTopCatBought()
    else:
        return jsonify("Method Not Supported"), 405


"""
    NEW ROUTES FOR FRONT END
"""
@app.route('/CoquiProgramming/User/account', methods=['GET'])
def get_acc_by_email_and_password():
    args = request.json
    if request.method == 'GET':
        if args:
            return UserController().get_acc_by_email_and_password(args)
        else:
            return jsonify("Args not found: email or password"), 405
    else:
        return jsonify("Method Not Allowed"), 405


if __name__ == '__main__':
    app.run(debug=True)
