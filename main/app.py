from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from controller.cart import CartController
from controller.globalstatistics import GlobalController
from controller.orders import OrderController
from controller.parts import PartController
from controller.user import UserController
from controller.wishlist import WishListController

app = Flask(__name__)

'''Root route for handler() function.'''


@app.route('/')
def handler():
    return 'Root route. Hello, user!'


"""
    All parts in the page. 
"""


@app.route('/PartsApp/Parts', methods=['GET', 'POST', 'DELETE'])
def parts_handler():
    if request.method == 'GET':
        return PartController().getAllParts()
    elif request.method == 'POST':
        return PartController().newPart(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    Page for part with specific part id.
"""


@app.route('/PartsApp/Parts/<int:part_id>', methods=['GET', 'PUT', 'DELETE'])
def parts_byid_handler(part_id):
    if request.method == 'GET':
        return PartController().getPartById(part_id)
    elif request.method == 'PUT':
        return PartController().updatePart(part_id, request.json)
    elif request.method == 'DELETE':
        return PartController().deletePart(part_id)
    else:
        return jsonify("Not Supported"), 405


"""
    Parts page for specified category of the part. 
"""


@app.route('/PartsApp/Parts/<string:cat_name>', methods=['GET'])
def parts_by_cat_name_handler(cat_name):
    if request.method == 'GET':
        return PartController().getPartByCatname(cat_name)

    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to page with filtered parts by prices less than or equal to desired price.
"""


@app.route('/PartsApp/Parts/Filter/PriceLessThan/<string:part_price>', methods=['GET'])
def parts_by_price_less_than_equal_to(part_price):
    if request.method == 'GET':
        return PartController().getPartsByPriceLessThanOrEqualTo(part_price)
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to access parts ordered alphabetically (A-Z).
"""


@app.route('/PartsApp/Parts/OrderedAsc', methods=['GET'])
def parts_by_name_ascending():
    if request.method == 'GET':
        return PartController().order_parts_by_name()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to access parts ordered alphabetically (Z-A).
"""


@app.route('/PartsApp/Parts/OrderedDesc', methods=['GET'])
def parts_by_name_descending():
    if request.method == 'GET':
        return PartController().order_parts_by_name_desc()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to access parts ordered by their price in ascending order. 
"""


@app.route('/PartsApp/Parts/OrderedAscByPrice', methods=['GET'])
def parts_by_price_ascending():
    if request.method == 'GET':
        return PartController().order_parts_by_price()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to access parts ordered by their price in descending order. 
"""


@app.route('/PartsApp/Parts/OrderedDescByPrice', methods=['GET'])
def parts_by_price_descending():
    if request.method == 'GET':
        return PartController().order_parts_by_price_desc()
    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to get all users
"""

@app.route('/PartsApp/User', methods=['GET', 'POST', 'PUT', 'DELETE'])
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

@app.route('/PartsApp/User/topPartBought/<int:user_id>', methods=['GET'])
def getTopPartBoughtByUser_handler(user_id):
        if request.method == 'GET':
            return UserController().getMostBoughtPartUser(user_id)
        else:
            return jsonify("Method Not Supported"), 405

@app.route('/PartsApp/User/topCatBought/<int:user_id>', methods=['GET'])
def getTopCatBoughtByUser_handler(user_id):
        if request.method == 'GET':
            return UserController().getMostBoughtCategoryUser(user_id)
        else:
            return jsonify("Method Not Supported"), 405

@app.route('/PartsApp/User/mostExpensivePart/<int:user_id>', methods=['GET'])
def getMostExpensivePartUser_handler(user_id):
        if request.method == 'GET':
            return UserController().getMostExpensivePartUser(user_id)
        else:
            return jsonify("Method Not Supported"), 405

@app.route('/PartsApp/User/CheapestPart/<int:user_id>', methods=['GET'])
def getCheapestPartUser_handler(user_id):
        if request.method == 'GET':
            return UserController().getCheapestPartUser(user_id)
        else:
            return jsonify("Method Not Supported"), 405
"""
    Route to get all orders
"""


@app.route('/PartsApp/Order', methods=['GET', 'PUT'])
def order_handler():
    if request.method == 'GET':
        return OrderController().getAllOrders()

    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO CREATE GET ORDER INFO
"""
@app.route('/PartsApp/Order/<int:order_id>', methods=['GET'])
def order_byid_handler(order_id):
    if request.method == 'GET':
        return OrderController().getOrderInfoById(order_id)
    else:
        return jsonify("Method Not Supported"), 405


@app.route('/PartsApp/Order', methods=['DELETE'])
def deleteorder_handler():
    if request.method == 'DELETE':
        return OrderController().deleteOrder(request.json)
    else:
        return jsonify("Method Not Supported"), 405


@app.route('/PartsApp/Order/getOrders/<int:user_id>', methods=['GET'])
def order_byuser_handler(user_id):
    if request.method == 'GET':
        return OrderController().getOrderByUser(user_id)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO CREATE NEW ORDER
"""

@app.route('/PartsApp/newOrder/<int:user_id>', methods=['GET', 'PUT', 'POST'])
def createOrder_handler(user_id):
    if request.method == 'POST':
        return OrderController().createOrder(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    Route to cart.
"""


@app.route('/PartsApp/Cart', methods=['POST', 'DELETE'])
def cart_handler():
    if request.method == 'POST':
        return CartController().newPart(request.json)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO REMOVE PART FROM CART
"""

@app.route('/PartsApp/Cart/<int:user_id>/<int:part_id>', methods=['DELETE'])
def cartDeletePart_handler(user_id, part_id):
    if request.method == 'DELETE':
        return CartController().deletePartFromCart(user_id, part_id)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO CLEAR CART
"""
@app.route('/PartsApp/Cart/<int:user_id>/', methods=['DELETE'])
def cartClearAllParts_handler(user_id):
    if request.method == 'DELETE':
        return CartController().clearAllPartsFromCart(user_id)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO VIEW USER CART
"""
@app.route('/PartsApp/ViewCart/<int:user_id>/', methods=['GET'])
def viewUserCart(user_id):
    if request.method == 'GET':
        return CartController().viewCart(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    Route to wishlist.

"""
@app.route('/PartsApp/WishList', methods=['POST', 'DELETE']) #checked works
def wishlist_handler():
    if request.method == 'POST':
        return WishListController().addPartToWishList(request.json)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO REMOVE PART FROM WISHLIST
"""
@app.route('/PartsApp/WishList/<int:user_id>/<int:part_id>', methods=['DELETE']) #checked works
def wishlistDeletePart_handler(user_id, part_id):
    if request.method == 'DELETE':
        return WishListController().deletePartFromWishList(user_id, part_id)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO CLEAR WISHLIST
"""
@app.route('/PartsApp/WishList/Clear/<int:user_id>/', methods=['DELETE'])
def wishlistClearAllParts_handler(user_id):
    if request.method == 'DELETE':
        return WishListController().clearAllPartsFromWishList(user_id)
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TO VIEW WISHLIST
"""
@app.route('/PartsApp/WishList/View/<int:user_id>/', methods=['GET']) #checked works
def viewUserWishList(user_id):
    if request.method == 'GET':
        return WishListController().viewWishList(user_id)
    else:
        return jsonify("Method Not Supported"), 405


"""
    ROUTE GLOBAL RANKS
    
    MOST EXPENSIVE
"""

@app.route('/PartsApp/GlobalRank/MostExpensive', methods=['GET'])
def getMostExpensive_handler():
    if request.method == 'GET':
        return GlobalController().getMostExpensive()
    else:
        return jsonify("Method Not Supported"), 405

"""
    CHEAPEST PART
"""
@app.route('/PartsApp/GlobalRank/Cheapest', methods=['GET'])
def getCheapest_handler():
    if request.method == 'GET':
        return GlobalController().getCheapest()
    else:
        return jsonify("Method Not Supported"), 405

    """
        ROUTE TO MOST LIKED PARTS
    """

@app.route('/PartsApp/GlobalRank/MostLiked', methods=['GET'])
def getMostLiked_handler():
    if request.method == 'GET':
        return GlobalController().getMostLiked()
    else:
        return jsonify("Method Not Supported"), 405

"""
    ROUTE TOP PRODUCT BOUGHT
"""
@app.route('/PartsApp/GlobalRank/topProductBought', methods=['GET'])
def getTopProductBought_handler():
        if request.method == 'GET':
            return GlobalController().getTopProductBought()
        else:
            return jsonify("Method Not Supported"), 405

"""
    ROUTE TOP CATEGORY BOUGHT
"""
@app.route('/PartsApp/GlobalRank/topCatBought', methods=['GET'])
def getTopCatBought_handler():
        if request.method == 'GET':
            return GlobalController().getTopCatBought()
        else:
            return jsonify("Method Not Supported"), 405


if __name__ == '__main__':
    app.run(debug=1)
