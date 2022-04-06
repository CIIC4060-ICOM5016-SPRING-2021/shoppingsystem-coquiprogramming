from flask import jsonify
from dao.cart import CartDAO


class CartController:

    def build_cart_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['part_id'] = row[1]
        result['quantity'] = row[2]
        return result


    def newPart(self, json):
        user_id = json['user_id']
        part_id = json['part_id']
        quantity = json['quantity']

        dao = CartDAO()
        part_id = dao.addPartToCart(user_id, part_id, quantity)

        return jsonify(json), 201