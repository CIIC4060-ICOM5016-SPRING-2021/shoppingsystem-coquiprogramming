from flask import jsonify
from dao.cart import CartDAO


class CartController:

    def build_cart_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['part_id'] = row[1]
        result['quantity'] = row[2]
        return result

    def view_cart_dict(self, row):
        result = {}
        #result['user_id'] = row[0]
        result['part_id'] = row[0]
        result['quantity'] = row[1]
        return result

    def viewPart_cart_dict(self, row):
        result = {}
        #result['user_id'] = row[0]
        result['part_id'] = row[0]
        result['quantity'] = row[1]
        return result

    def newPart(self, json):
        user_id = json['user_id']
        part_id = json['part_id']
        quantity = json['quantity']

        dao = CartDAO()
        part_id = dao.addPartToCart(user_id, part_id, quantity)

        return jsonify(json), 201

    def deletePartFromCart(self, user_id, part_id):

        dao = CartDAO()
        result_tuple = dao.deletePartFromCart(user_id, part_id)

        if not result_tuple:
            return jsonify("PART NOT FOUND"), 404
        else:
            dao.deletePartFromCart(user_id, part_id)
        return jsonify("Part Deleted"), 200

    def clearAllPartsFromCart(self, user_id):
        dao = CartDAO()
        result_tuple = dao.clearAllPartsFromCart(user_id)

        if not result_tuple:
            return jsonify("PART NOT FOUND"), 404
        else:
            dao.clearAllPartsFromCart(user_id)
        return jsonify("Cart Has Been Cleared"), 200

    def viewCart(self, user_id):
        dao = CartDAO()

        result_tuples = dao.viewCart(user_id)
        result = []
        for row in result_tuples:
            dict = self.view_cart_dict(row)
            result.append(dict)

        return jsonify(cart=result)

